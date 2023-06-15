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
    var sql = `INSERT INTO Tabelas_Salvas (id_tabela,id_pasta) VALUES("` +req.body.id_tabela + `","` +req.body.id_pasta + `")`;
    console.log(sql);
    db.run(sql, [], (err) => {
        if (err) {
          //Joga o erro pro console, impedindo acontecer um travamento geral
          throw err;
        }
        res.write("Adicionado à pasta com sucesso!");
        res.end(); // Send the response to the client
        db.close(); // Close the database connection
    });
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
        res.write('<p>Tabela removida da pasta com sucesso!</p>');
        res.end();
    });
    db.close(); // Fecha o banco
});

//Serve para importar todos os endpoints realizados para o arquivo 
module.exports = router;