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

//Tela de Tickets
router.get('/', (req, res) => {
    //Verifica se o usuário está logado
    if (req.session.autenticado) {
        var titulo = "Tickets";
        var icone = "/public/assets/logoPanpediaReduzida.svg";
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
        else if(req.session.acesso == 1){
            var sql = `SELECT * FROM Tickets` 
            db.all(sql, [], (err, rows) => {
                if (err) {
                    //Joga o erro pro console, impedindo acontecer um travamento geral
                    throw err;
                }
                //Renderiza a página de resultados, passando de parâmetro o resultado da busca no banco de dados
                res.render("index/ticketGov", {tickets:rows, title: titulo, iconeTitulo: icone });
            });
            db.close();   
        }
    }
    //Redireciona o usuário para a página de login, caso ele não esteja logado
    else {
        res.redirect("/");
    }
})

router.post("/criar-ticket", (req, res) => {
        //Verifica se o usuário está logado
        if (req.session.autenticado) {
            //Garantir que a requisição tem código inicial correto
            res.statusCode = 200;
            //Define o cabeçalho da requisição
            res.setHeader('Acess-Control-Allow-Origin', '*');
            //Inicializa o banco de dados
            var db = new sqlite3.Database(DBPATH); 
            //Comando sql a ser executado
            //Parâmetros de filtros passados na requisição de uma pesquisa
            var database = req.query.database;
            var idTabela = req.query.idTabela;
            var caminho = req.query.caminhoTabela;
            var id = req.query.id;
            var sql = `INSERT INTO Tickets (ID_TABELA,ID_USER,STATUS,APROVADO,DATABASE,TABELA,CAMINHO) VALUES (${id},${req.session.id_user},0,0,${database},${idTabela},${caminho})`;
            db.all(sql,[],(err,rows)=>{
                if (err) {
                    //Joga o erro pro console, impedindo acontecer um travamento geral
                    throw err;
                }
                res.redirect("/ticket");
                db.close();
            });
}});

router.post("/status", (req, res) => {
    //Verifica se o usuário está logado
    if (req.session.autenticado) {
        if(req.session.id_user==1){
            var id = req.body.id_ticket;
            var status = req.body.status;
            //Garantir que a requisição tem código inicial correto
            res.statusCode = 200;
            //Define o cabeçalho da requisição
            res.setHeader('Acess-Control-Allow-Origin', '*');
            //Inicializa o banco de dados
            var db = new sqlite3.Database(DBPATH); 
            //Comando sql a ser executado
            var sql = `UPDATE Tickets SET STATUS = ${status} WHERE Tickets = ${id}`;
            db.all(sql,[],(err,rows)=>{
                if (err) {
                    //Joga o erro pro console, impedindo acontecer um travamento geral
                    throw err;
                }
                res.redirect("/ticket");
                db.close();
            });
        }
}});

router.post("/aprovado", (req, res) => {
    //Verifica se o usuário está logado
    if (req.session.autenticado) {
        if(req.session.id_user==1){
            var id = req.body.id_ticket;
            var aprovado = req.body.aprovado;
            //Garantir que a requisição tem código inicial correto
            res.statusCode = 200;
            //Define o cabeçalho da requisição
            res.setHeader('Acess-Control-Allow-Origin', '*');
            //Inicializa o banco de dados
            var db = new sqlite3.Database(DBPATH); 
            //Comando sql a ser executado
            var sql = `UPDATE Tickets SET APROVADO = ${aprovado} WHERE ID_TICKET = ${id}`;
            db.all(sql,[],(err)=>{
                if (err) {
                    //Joga o erro pro console, impedindo acontecer um travamento geral
                    throw err;
                }
                var sqlTicket = `SELECT * FROM Tickets WHERE ID_TICKET = ${id}`;
                db.all(sqlTicket,[],(err,rows)=>{
                    if (err) {
                        //Joga o erro pro console, impedindo acontecer um travamento geral
                        throw err;
                    }
                    var atualizar = `UPDATE Catalogo_Dados_Tabelas SET DATABASE = ${rows[0].DATABASE}, TABELA = ${rows[0].TABELA}, CAMINHO = ${rows[0].CAMINHO}`
                    db.run(atualizar,[],err=>{
                        if (err) {
                            //Joga o erro pro console, impedindo acontecer um travamento geral
                            throw err;
                        }  
                        res.redirect("/ticket");
                        db.close();
                    })
                })
            });
            db.close();
        }
    }
});

module.exports = router;