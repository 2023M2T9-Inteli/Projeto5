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

// Tela principal dos favoritos
router.get('/',(req,res)=>{
    //Verifica se o usuário está logado
    if(req.session.autenticado){
        var titulo = "Favoritos";
        var icone = "/public/assets/logoPanpediaReduzida.svg";
        //Garantir que a requisição tem código inicial correto
        res.statusCode = 200;
        //Define o cabeçalho da requisição
        res.setHeader('Acess-Control-Allow-Origin','*');
        //Inicializa o banco de dados
        var db = new sqlite3.Database(DBPATH);
        //Define a sentença sql a ser executada, nesse caso buscando na pasta de tabelas a tabela que está em uma pasta
        var sql = `SELECT Catalogo_Dados_Tabelas.ID, Catalogo_Dados_Tabelas.CONTEUDO_TABELA, Tabelas_Salvas.ID_RELACIONAMENTO FROM Tabelas_Salvas
        INNER JOIN Catalogo_Dados_Tabelas on Tabelas_Salvas.ID_TABELA = Catalogo_Dados_Tabelas.ID 
        INNER JOIN Pastas on Tabelas_salvas.ID_PASTA = Pastas.ID_PASTA
        INNER JOIN Usuarios on Pastas.ID_USER = Usuarios.ID_USER
        WHERE Usuarios.ID_USER = ${req.session.id_user}`;
        console.log(sql);
        //Executa o sql, passando como parametros a sentença já definida, nenhum parametro para ser substituido na sentença sql, e duas variáveis, uma para
        //erros e outra para resposta
        db.all(sql,[],(err,rows)=>{
            if(err){
                console.log(err);
            }
            //Atribui a conteudo a resposta da sentença sql
            var conteudo = rows;
            if(rows !== null){
                //Renderiza a página home, passando de parâmetro o resultado da busca no banco de dados, além do nome do usuário
                res.render("index/favoritos", {fav:conteudo, title:titulo, iconeTitulo:icone, idPasta: req.session.id_pasta});
            } else {
                //Caso não tenha havido nenhum resultado, renderiza a página home só passando o nome como parãmtreo.
                res.render("index/favoritos",{title:titulo, iconeTitulo:icone});
            }
        })
    }
    //Redireciona o usuário para a página de login, caso ele não esteja logado
    else{
        res.redirect("/");
    }
})

//TABELA Tabelas_salvas
//Read
router.get('/pastas-tabela',(req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode = 200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH); 
    //Varíavel para a definição da sentença SQl
    var sql = `SELECT * FROM Tabelas_Salvas WHERE id_pasta ="` + req.query.id_pasta + `"`;
    //Execução do comando sql
    db.all(sql,[],(err,rows)=>{ 
        if(err){
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

//Create
router.post('/adicionar-pasta',urlencodedParser,(req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode = 200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH); 
    //Varíavel para a definição da sentença SQl
    console.log(req.body.id_pasta);
    var sql = `INSERT INTO Tabelas_Salvas (ID_TABELA, ID_PASTA) VALUES ('${req.body.id_tabela}', ${req.body.id_pasta})`;
    console.log(sql);
    db.run(sql, [], (err) => {
        if (err) {
          //Joga o erro pro console, impedindo acontecer um travamento geral
          throw err;
        }
    });
    res.redirect('/fav')
    res.end(); // Send the response to the client
    db.close();
});  

// Endpoint para deletar uma tabela do favoritos
router.get('/deletar-info-pasta',(req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode = 200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH); 
    //Varíavel para a definição da sentença SQl
    sql = `DELETE FROM Tabelas_Salvas WHERE ID_RELACIONAMENTO = "` + req.query.id_relacionamento + `"`;
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
    });
    res.redirect('/fav')
    res.end(); // Send the response to the client
    db.close();
});

//Serve para importar todos os endpoints realizados para o arquivo 
module.exports = router;