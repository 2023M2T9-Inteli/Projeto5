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

//Login
router.post('/fazer-login', urlencodedParser,(req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode = 200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH);
    //Varíavel para a definição da sentença SQl
    var sql = 'SELECT * FROM Usuarios WHERE EMAIL = "' + req.body.email_user + '" AND SENHA = "' + req.body.password + '"';
    console.log(sql);
    //Executa o sql, passando como parametros a sentença já definida, nenhum parametro para ser substituido na sentença sql, e duas variáveis, uma para
    //erros e outra para resposta
    db.all(sql, [], ( err,rows) => {
        //Verifica se houve erro ao executar a sentença
        if (err) {
           console.error(err);
           res.status(500).json({ error: 'An error occurred' });
        } else if (rows.length === 0) {
           res.status(401).json({ error: 'Invalid username or email' });
        } else if (rows[0].SENHA !== req.body.password) {
           console.error(err);
           console.log(rows);
           res.status(401).json({ error: 'Invalid password' });
        } 
        //Caso a execução seja feita sem erros
        else {
            //Guarda na sessão do usuário, seu ID, Nome, o tipo de usuário e confirma que ele está autenticado
            req.session.id_user = rows[0].ID_USER;
            req.session.nome = rows[0].NOME;
            req.session.acesso = rows[0].ACESSO;
            req.session.autenticado = true;
            //Redireciona para o endpoint menu
            res.redirect("menu")
        }
    });
})

//C do CRUD -> Create na Tabela Usuarios
router.post('/cadastrar-usuarios', urlencodedParser,(req,res)=>{
   //Garantir que a requisição tem código inicial correto
   res.statusCode = 200;
   //Define o cabeçalho da requisição
   res.setHeader('Acess-Control-Allow-Origin','*');
   //Inicializa o banco de dados
   var db = new sqlite3.Database(DBPATH);
   //Varíavel para a definição da sentença SQl
   var sql = 'INSERT INTO Usuarios (nome, email, senha, acesso, img_user) VALUES("'+req.body.nome+'","'+req.body.email+'","'+req.body.senha+'","'+req.body.acesso+'","'+req.body.img_user+'");';
   console.log(sql);
   db.run(sql,[],err=>{
       if (err) {
           //Joga o erro pro console, impedindo acontecer um travamento geral
           throw err;
       }
   });
   db.close();
   res.write("Usuario Cadastrado!");
   res.end();
});

//R do CRUD -> Read Tabela Usuarios
router.get('/mostrar-usuarios',(req,res)=>{
   //Garantir que a requisição tem código inicial correto
   res.statusCode = 200;
   //Define o cabeçalho da requisição
   res.setHeader('Acess-Control-Allow-Origin','*');
   //Inicializa o banco de dados
   var db = new sqlite3.Database(DBPATH);
   //Varíavel para a definição da sentença SQl
   var sql = 'SELECT * FROM Usuarios';
   db.all(sql,[],(err, rows)=>{
       if (err) {
           //Joga o erro pro console, impedindo acontecer um travamento geral
           throw err;
       }
       res.json(rows);
   });
   db.close();
});

//Endpoint para a verificação do usuário
router.get('/atualiza-usuarios',(req,res)=>{
   //Garantir que a requisição tem código inicial correto
   res.statusCode = 200;
   //Define o cabeçalho da requisição
   res.setHeader('Acess-Control-Allow-Origin','*');
   //Inicializa o banco de dados
   var db = new sqlite3.Database(DBPATH);
   //Varíavel para a definição da sentença SQl
   var sql = 'SELECT * FROM Usuarios WHERE id_user = ' + req.query.id_user;
   db.all(sql,[],(err, rows)=>{
       if (err) {
           //Joga o erro pro console, impedindo acontecer um travamento geral
           throw err;
       }
       res.json(rows);
   });
});

//U do CRUD -> Update Tabela Usuarios
router.post('/atualiza-usuarios', urlencodedParser ,(req,res)=>{
   //Garantir que a requisição tem código inicial correto
   res.statusCode = 200;
   //Define o cabeçalho da requisição
   res.setHeader('Acess-Control-Allow-Origin','*');
   //Inicializa o banco de dados
   var db = new sqlite3.Database(DBPATH);
   //Varíavel para a definição da sentença SQl
   var sql = 'UPDATE Usuarios SET nome = "'+ req.body.nome + '", email ="' + req.body.email + '" WHERE id_user =' + req.body.id_user;
   console.log(sql);
   db.run(sql, [],  err => {
       if (err) {
           throw err;
       }	
   });
   res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
   db.close(); // Fecha o banco
   res.end();
});

//Serve para importar todos os endpoints realizados para o arquivo 
module.exports = router;
