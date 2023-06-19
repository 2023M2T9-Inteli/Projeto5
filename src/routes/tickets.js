// Constantes que exigem a instalação das dependências para o node funcionar 
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

//Constante que define o local onde está o banco de dados
const DBPATH = './src/database/dbPanpedia.db';

//Decodifica os dados e permite com que o servidor leia, deixando de ter %20 para espaços, por exemplo.
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Define uma constante router, a qual serve para definir que é um objeto do tipo router. Possui funcionamento similar ao de um app, porém com a diferença
//que pode ser exportado 
const router = express.Router();

//Tela de Tickets
router.get('/', (req, res) => {
    //Verifica se o usuário está logado
    if (req.session.autenticado) {
        var titulo = "Tickets";
        var icone = "/public/assets/logoPanpediaReduzido.svg";
        //Garantir que a requisição tem código inicial correto
        res.statusCode = 200;
        //Define o cabeçalho da requisição
        res.setHeader('Acess-Control-Allow-Origin', '*');
        //Inicializa o banco de dados
        var db = new sqlite3.Database(DBPATH); 
        //Comando sql a ser executado
        if (req.session.acesso == 0) {
            var sql = `SELECT * FROM Tickets WHERE ID_USER = ` + req.session.id_user;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    //Joga o erro pro console, impedindo acontecer um travamento geral
                    throw err;
                }
                //Renderiza a página de resultados, passando de parâmetro o resultado da busca no banco de dados
                res.render("index/tickets", {tickets:rows, title: titulo, iconeTitulo: icone });
            });
            db.close();
        }
        else if(req.session.acesso ==1){
            var sql = `SELECT * FROM Tickets` 
            db.all(sql, [], (err, rows) => {
                if (err) {
                    //Joga o erro pro console, impedindo acontecer um travamento geral
                    throw err;
                }
                //Renderiza a página de resultados, passando de parâmetro o resultado da busca no banco de dados
                res.render("index/ticketsGov", {tickets:rows, title: titulo, iconeTitulo: icone });
            });
            db.close();   
        }
    }
    //Redireciona o usuário para a página de login, caso ele não esteja logado
    else {
        res.redirect("/");
    }
})

module.exports = router;