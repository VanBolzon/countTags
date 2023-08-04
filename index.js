const axios = require('axios');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();

const urls = [
  'https://www.google.com/',
  'https://www.example.com/',
];

async function getTagsCount(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    
    const tags = {};

    $('*').each((index, element) => {
      const tagName = element.tagName;

      if (tags[tagName]) {
        tags[tagName] += 1;
      } else {
        tags[tagName] = 1;
      }
    });

    return tags;
  } catch (error) {
    console.error(`Erro ao obter as tags da página ${url}: ${error.message}`);
    return {};
  }
}

async function saveDataToDB(url, tagsCount) {
  const db = new sqlite3.Database('tags.db');

  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS tags (url TEXT, tagName TEXT, count INTEGER)');

    for (const tagName in tagsCount) {
      const count = tagsCount[tagName];

      db.run('INSERT INTO tags (url, tagName, count) VALUES (?, ?, ?)', [url, tagName, count], (err) => {
        if (err) {
          console.error(`Erro ao inserir dados para a página ${url}: ${err.message}`);
        }
      });
    }
  });

  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    }
  });
}

async function main() {
  for (const url of urls) {
    const tagsCount = await getTagsCount(url);
    const totalTags = Object.values(tagsCount).reduce((total, count) => total + count, 0);

    console.log(`Tags coletadas para a página: ${url}`);
    console.table(tagsCount);
    console.log('Total de tags:', totalTags);

    await saveDataToDB(url, tagsCount);
  }
}

main();
