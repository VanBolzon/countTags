# Contador de Tags HTML
Projeto de teste prático, utilizando o node.js, que consiste em analisar e contar as tags HTML de diferentes páginas que são passadas com parâmetro.
Foram utilizadas as bibliotecas Axios, Cheerio, e SQLite3.
Onde:
- Axios: Foi utilizado para fazer as requisições HTTP;
- Cheerio: Foi utilizado para analisar o HTML;
- SQLite3: Foi utilizado para salvar os resultados obtidos;

## Instalação

1. O node.js precisa estar instalado na máquina;
2. Clone este repositório;
3. Navegue até a pasta do projeto pelo terminal.
4. Instale as dependências usando o comando: (npm install);


## Como Usar

1. Para atualizar a lista de urls, basta abri o arquivo index.js, e inserir as urls que serão analisadas.
2. Para executar o programa, use o seguinte comando: (node index.js)


3. Será analisada e coletadas as tags HTML de cada URL listada no array, e será exibida as contagens individuais de tags e o total de tags para cada URL.

4. Além disso, os resultados serão armazenados em um banco de dados SQLite chamado `tags.db`.