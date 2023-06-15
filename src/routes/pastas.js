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

//TABELA PASTAS

//Adiciona um registro da Tabela Pastas
router.post('/adicionar-pasta',urlencodedParser, (req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode = 200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH); 
    //Varíavel para a definição da sentença SQl
    var sql = `INSERT INTO Pastas (id_user,nome) VALUES("` +req.body.id_user + `","` +req.body.nome + `")`;
    
    db.run(sql,[],(err, rows)=>{
        if (err) {
            //Joga o erro pro console, impedindo acontecer um travamento geral
            throw err;
        }
    });
    res.write("Pasta adicionada com sucesso!");
    db.close();
    res.end();
});

//Read Todas as pastas da Tabela Pastas
router.get('/pastas',(req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode = 200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH); 
    //Varíavel para a definição da sentença SQl
    var sql = `SELECT * FROM Pastas`;
    //Execução do comando sql
    db.all(sql,[],(err,rows)=>{ 
        if(err){
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

//Read -> Tabela Pastas -> Específica
router.get('/usarios-pastas',(req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode = 200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH); 
    //Varíavel para a definição da sentença SQl
    var sql = `SELECT * FROM Pastas WHERE id_user = "` + req.query.id_user + `"`;
    //Execução do comando sql
    db.all(sql,[],(err,rows)=>{
        if(err){
            throw err;
        }
        res.json(rows);
     });
     db.close;
});

//Update  
router.get('/atualizar-pastas',(req,res)=>{
     //Garantir que a requisição tem código inicial correto
     res.statusCode = 200;
     //Define o cabeçalho da requisição
     res.setHeader('Acess-Control-Allow-Origin','*');
     //Inicializa o banco de dados
     var db = new sqlite3.Database(DBPATH); 
     //Varíavel para a definição da sentença SQl
     var sql = `SELECT * FROM Pastas WHERE id_pasta ="` + req.query.id_pasta + `"`;
     //Execução do comando sql
     db.all(sql,[],(err,rows)=>{
        if(err){
            throw err;
        }
        
     });
     res.write("Pasta Atualizada!");
     db.close;
});

//Update 
router.post('/atualizar-pastas',urlencodedParser,(req,res)=>{
    //Garantir que a requisição tem código inicial correto
    res.statusCode=200;
    //Define o cabeçalho da requisição
    res.setHeader('Acess-Control-Allow-Origin','*');
    //Inicializa o banco de dados
    var db = new sqlite3.Database(DBPATH); 
    //Varíavel para a definição da sentença SQl
    var sql = `UPDATE Pastas SET id_user = "` +req.body.id_user + `", nome = "` + req.body.nome + `" WHERE id_pasta = "` +req.body.id_pasta + `"`;
    //Execução do comando sql
    db.run(sql,[],(err, rows)=>{
        if (err) {
            //Joga o erro pro console, impedindo acontecer um travamento geral
            throw err;
        }
        res.json(rows);
    });
    db.close();
    res.end();
});

//Serve para importar todos os endpoints realizados para o arquivo 
module.exports = router;
