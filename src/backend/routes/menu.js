// Constantes que exigem a instalação das dependências para o node funcionar 
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

//Constante que define o local onde está o banco de dados
const DBPATH = './backend/database/dbPanpedia.db';

//Decodifica os dados e permite com que o servidor leia, deixando de ter %20 para espaços, por exemplo.
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Define uma constante router, a qual serve para definir que é um objeto do tipo router. Possui funcionamento similar ao de um app, porém com a diferença
//que pode ser exportado
const router = express.Router();

//Tela principal do site
router.get('/',(req,res)=>{
    //Verifica se o usuário está logado
    if(req.session.autenticado){
        //Variáveis que definem o nome e ícone da página
        var titulo = "Menu";
        var icone = "/public/assets/logoPanpediaReduzida.svg";
        //Garantir que a requisição tem código inicial correto
        res.statusCode = 200;
        //Define o cabeçalho da requisição
        res.setHeader('Acess-Control-Allow-Origin','*');
        //Inicializa o banco de dados
        var db = new sqlite3.Database(DBPATH);
        //Define a sentença sql a ser executada, nesse caso buscando na pasta de tabelas a tabela que está em uma pasta
        var sqlpasta = `SELECT Catalogo_Dados_Tabelas.ID, Tabelas_Salvas.ID_RELACIONAMENTO, Pastas.ID_PASTA, Catalogo_Dados_Tabelas.CONTEUDO_TABELA  FROM Tabelas_Salvas
        INNER JOIN Catalogo_Dados_Tabelas on Tabelas_Salvas.ID_TABELA = Catalogo_Dados_Tabelas.ID 
        INNER JOIN Pastas on Tabelas_salvas.ID_PASTA = Pastas.ID_PASTA
        INNER JOIN Usuarios on Pastas.ID_USER = Usuarios.ID_USER
        WHERE Usuarios.ID_USER = "` + req.session.id_user + `"`; //Pega o parâmetro armazenado na sessão de id_user
        //console.log(sqlpasta);
        //Executa o sql, passando como parametros a sentença já definida, nenhum parametro para ser substituido na sentença sql, e duas variáveis, uma para
        //erros e outra para resposta
        db.all(sqlpasta,[],(err,rows)=>{
            if(err){
                console.log(err);
            }
            //Atribui a conteudo a resposta da sentença sql
            var conteudo = rows;
            //Verifica se existe uma resposta
            if(rows.length !== 0){
                //Renderiza a página home, passando de parâmetro o resultado da busca no banco de dados, além do nome do usuário 
                //Atribui a sessão o id da pasta para permitir favoritar uma tabela
                req.session.id_pasta = rows[0].ID_PASTA;
                res.render("index/home", {conteudo:conteudo, nome:req.session.nome, title:titulo, iconeTitulo:icone});
            } else {
                //console.log(req.session.id_user);
                //Procura a pasta do usuário para permitir favoritar tabelas
                var acharPasta = `SELECT Pastas.ID_PASTA FROM Pastas WHERE Pastas.ID_USER = ${req.session.id_user}`
                //console.log(acharPasta);
                db.all(acharPasta,[],(err,resultado)=>{
                    //Caso não tenha havido nenhum resultado, renderiza a página home só passando o nome como parãmtreo.
                    //console.log(resultado);
                    req.session.id_pasta = resultado[0].ID_PASTA;
                    res.render("index/home",{nome:req.session.nome,title:titulo, iconeTitulo:icone, conteudo:0});
                });
            }
        })
    }
    //Redireciona o usuário para a página de login, caso ele não esteja logado
    else{
        
        res.redirect("/");
    }
})

            
//Serve para importar todos os endpoints realizados para o arquivo 
module.exports = router;