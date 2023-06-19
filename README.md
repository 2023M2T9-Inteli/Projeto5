# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

## Panpedia
<p align="center">
<a href= "https://www.bancopan.com.br/"><img src="https://cdn.cookielaw.org/logos/82b81c01-85cd-4ada-9c9d-656b3e5682dd/9be12e3b-5e10-436c-826d-d0dfc661f023/9c073e0c-345d-4dae-a9c4-b55a6c15e17f/banco-pan-logo-8.png alt="Banco Pan"></a></p>

## Synapse

--

## Integrantes: 
- <a href="https://github.com/ItsVasconcellos">Fernando Antonio Sampaio Cabral De Vasconcellos</a>
- <a href="https://github.com/KalebIsaias">Kaleb Isaias Souza De Carvalho</a>
- <a href="https://github.com/y2keylla">Keylla Cristina Oliveira Bispo</a> 
- <a href="https://github.com/leonardoalves1">Leonardo Alves Nunes</a>
- <a href="https://github.com/LuizFernandoLeao">Luiz Fernando Haddad Saad Villaça Leão</a> 
- <a href="https://github.com/Paula-zp">Paula Zanella Piva</a>
  
 ## Orientador: 
- <a href="https://www.linkedin.com/in/profclaudioandre/">Cláudio Fernando André</a>
  
## Professores: 
- <a href="https://www.linkedin.com/in/fatima-toledo/">Fátima Toledo</a>
- <a href="https://www.linkedin.com/in/flaviomarquesazevedo/">Flávio Marques Azevedo</a>
- <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco Escobar</a>
- <a href="https://www.linkedin.com/in/henrique-mohallem-paiva-6854b460/">Henrique Mohallem Paiva</a>



  

## 📝 Descrição

O Panpedia é um catálogo web para pesquisa de metadados do Banco Pan. Nosso projeto é melhorar este catálogo tornando-o mais amigável em termos de Design e útil quanto à novas features e melhorias nas já existentes. A solução proposta consiste de uma aplicação web, desenvolvida para que o usuário utilize principalmente através de um desktop. O site será desenvolvido utilizando de tecnologias comuns à web, como HTML, Tailwind CSS, Javascript e Node.js, sendo desenvolvida também um backend aliado ao site.
  
## 📁 Estrutura de pastas

|--> documentos<br>
  &emsp;| --> outros <br>
  &emsp;| T9_G5_V0.3.1_Web_application_document.docx<br>
  &emsp;| TT9_G5_V0.3.1_Web_application_document.pdf<br>
  
|--> imagens<br>
  
|--> src<br>
  &emsp;|--> Backend<br>
  &emsp;|router<br>
  
  &emsp;|--> database<br>
  
  &emsp;|--> Frontend<br>
  &emsp;|assets<br>
  &emsp;|css<br>
  
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js:  [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após,  abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.


```
Alunos inteli (remover essa observação do readme.md após leitura e execução):
1. Certifique-se que há um arquivo "package.json" na pasta backend do projeto.
2. Dentro deste arquivo, encontre a propriedade "scripts", e adicione um atributo de nome "start"
com o valor "node <CAMINHO_DO_ARQUIVO_DO_SERVIDOR>." Atenção: "<CAMINHO_DO_ARQUIVO_DO_SERVIDOR>" 
deve ser substituído pelo caminho para o arquivo principal da aplicação, utilizado para subir o
servidor. Por exemplo, se o arquivo utilizado para subir o servidor é "app.js", o atributo start
deve possuir o valor "node app.js".
3. No arquivo utilizado para subir a aplicação, defina a porta padrão de execução para "1234".
````

## 🗃 Histórico de lançamentos

* 0.2.1 - 25/01/2022
    * Atualização de documentos (código do módulo permanece inalterado).
* 0.2.0 - 15/01/2022
    * Remove `setDefaultXYZ()`
    * Adiciona `init()`
* 0.1.1 - 11/01/2022
    * Crash quando chama `baz()`
* 0.1.0 - 10/01/2022
    * O primeiro lançamento adequado
    * Renomeia `foo()` para `bar()`
* 0.0.1 - 01/01/2022
    * Trabalho em andamento

## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Spidus/Teste_Final_1">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, Fernando Vasconcellos, Kaleb Carvalho, Keylla Oliveira, Leonardo Nunes, Luiz Leão, Paula Piva </a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>
