// Constantes para exigir que os pacotes estejam instalados no sistema 
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');


//Constante que define o local onde está o banco de dados
const DBPATH = './src/database/dbPanpedia.db';


/*Texto para filtro melhorado
"Catalogo_Dados_Tabelas.ID AS nome, Catalogo_Dados_Tabelas.CONJUNTODADOS_PRODUTO AS"+
"conjunto_dados, ID_Tabela AS tabela_aws, Catalogo_Dados_Tabelas.TABELA AS tabela, CONTEUDO_TABELA AS descricao,"+
"CRITICIDADE_TABELA AS critico, DADOS_SENSIVEIS AS sensibilidade_dados, DEFASAGEM as defasagem, DATABASE as"+ 
"database, CAMINHO AS url, ENG_INGESTAO AS nome_engenheiro, OWNER AS owner, STEWARD AS steward,"+ 
"INDICADORAJUSTENOMENCLATURATABELA AS ajuste_nomenclatura"*/

const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Constantes para inicializar o servidor
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(session({
	secret: 'secret-key-pan-651',
	resave: false,
	saveUninitialized: true,
}))

//Constantes que definem as rotas dos endpoints, servem para dizer onde o express deve buscar para achar os respectivos endpoints
const usersRouter = require('./routes/usuarios.js');
const tabelasRouter = require('./routes/info_tabelas.js');
const pastasRouter = require('./routes/pastas.js');
const tabelasSalvasRouter = require('./routes/favoritos.js');
const paginasRouter = require('./routes/menu.js');
const ticketsRouter = require('./routes/tickets.js');
/* Definição dos endpoints */
app.use(express.json());

//Endpoints da tabela catalogo_dados_tabelas
app.use('/tabelas', tabelasRouter);

//Endpoints da tabela usuarios
app.use('/', usersRouter);

//Endpoints da tabela Pasta
app.use('/pastas', pastasRouter);

//Endpoints das tabelas_Salvas
app.use('/fav', tabelasSalvasRouter);

//Endpoints das tabelas_Salvas
app.use('/tickets', ticketsRouter);

//Endpoints das tabelas_Salvas
app.use('/menu', paginasRouter);

app.all('/', urlencodedParser, (req, res) => {
	//Garantir que a requisição tem código inicial correto
	res.statusCode = 200;
	//Define o cabeçalho da requisição
	res.setHeader('Acess-Control-Allow-Origin', '*');
	var titulo = "Login";
	res.render("index/login", { title: titulo });
})


app.get('/filtro', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Acess-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH);
	var queryCat = 'SELECT DISTINCT CONJUNTODADOS_PRODUTO FROM Catalogo_Dados_Tabelas';
	db.all(queryCat, [], (err1, rowsCat) => {
		if (err1) {
			throw err1;
		}
		var queryDb = 'SELECT DISTINCT DATABASE FROM Catalogo_Dados_Tabelas';
		db.all(queryDb, [], (err2, rowsDb) => {
			if (err2) {
				throw err2;
			}
			var queryOw = 'SELECT DISTINCT OWNER FROM Catalogo_Dados_Tabelas';
			db.all(queryOw, [], (err3, rowsOw) => {
				if (err3) {
					throw err3;
				}
				var queryCri = 'SELECT DISTINCT CRITICIDADE_TABELA FROM Catalogo_Dados_Tabelas';
				db.all(queryCri, [], (err4, rowsCri) => {
					if (err4) {
						throw err4;
					}
					const filtro = {
						categoria: rowsCat,
						database: rowsDb,
						owner: rowsOw,
						criticidade: rowsCri
					}
					res.json(filtro);
				});
			});
		});
	});
	db.close();
})


const path = require("path");

// Importa as configurações do app
require("dotenv").config({ encoding: "utf8", path: path.join(__dirname, "../env") });

// Configura o cache da view engine EJS, para armazenar as
// 200 últimas páginas já processadas, por ordem de uso.
const ejs = require("ejs");
const LRU = require("lru-cache");
ejs.cache = new LRU({
	max: 200
});



// Configura o diretório de onde tirar as views.
app.set("views", path.join(__dirname, "/views"));
// Define o view engine como o ejs.
// https://ejs.co/
app.set("view engine", "ejs");

// **********************************************************
// Os middlewares são executados na ordem que são instalados!
// **********************************************************

// Configura o middleware de arquivos estáticos para responder às
// rotas iniciadas por "/public", servindo o conteúdo da pasta "../public".
app.use("/public", express.static(path.join(__dirname, "../src/public"), {
	// Aqui estamos configurando o cache dos arquivos estáticos... Muito
	// útil em ambientes de produção, mas deve-se ter cuidado durante a
	// fase de desenvolvimento.
	cacheControl: false,
	etag: false,
	maxAge: "30d"
}));

// Configura o middleware que lê cookies. Ele está aqui, abaixo do middleware
// de arquivos estáticos, porque não precisamos de cookies para servir arquivos
// estáticos.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Configura os middlewares responsáveis por fazer o parse do conteúdo do body
// quando ele for um JSON, ou um form convencional.
// http://expressjs.com/en/api.html#express.json
app.use(express.json());
// http://expressjs.com/en/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));

// Esse middle serve para evitar cache das páginas e api no geral. Ele também fica
// aqui, depois do middleware de arquivos estáticos, pois os arquivos static devem
// usar cache em ambiente de produção.
app.use((req, res, next) => {
	res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
	res.header("Expires", "-1");
	res.header("Pragma", "no-cache");
	next();
});

// Especifica quais módulos serão responsáveis por servir cada rota, a partir dos
// endereços requisitados pelo cliente.
//
// A string no primeiro parâmetro representa o começo do caminho requisitado. Vamos
// ver alguns exemplos de caminhos, e como eles seriam tratados pelo Express, assumindo
// a existência dos seguintes tratadores:
//
// - index, registrado com o prefixo "/", e com as rotas internas "/" e "/outra"
// - usuario, registrado com o prefixo "/usuario", e com as rotas internas "/" e "/novo"
//
// Caminho completo pedido pelo cliente  Caminho repassado para o tratador   Tratador e resultado
// /                                     /                                   index (OK)
// /usuario                              /                                   usuario (OK)
// /usuario/novo                         /novo                               usuario (OK)
// /usuario/alterar                      /alterar                            usuario (Erro, não temos /alterar em usuario)
// /outra                                /outra                              index (OK)
// /usuarioteste                         /usuarioteste                       index (Erro, não temos /usuarioteste em index)
//
// https://expressjs.com/en/guide/routing.html

//
// O Express diferencia um tratador regular (como os anteriores) de um tratador
// de erros, como esse aqui abaixo, pela quantidade de parâmetros!!!
//
// Isso é possível, porque em JavaScript, f.length retorna a quantidade
// de parâmetros declarados na função f!!!
app.use((req, res, next) => {
	// Esse aqui é um tratador comum, que será executado ao final da lista",
	// quando nenhum outro tratador retornou algum conteúdo. Ou seja...
	// O que o cliente pediu não foi encontrado!
	const err = new Error("Não encontrado");
	err.status = 404;

	// Executa o próximo tratador na sequência passando apenas o erro,
	// de modo que esse caso particular seja tratado como um erro qualquer
	// do sistema.
	next(err);
});

app.use((err, req, res, next) => {
	// Se nenhum status foi definido até aqui, definimos o status 500.
	const status = err.status || 500
	res.status(status);

	// Em vez de send, poderíamos ter utilizado render() para devolver
	// uma página de verdade.
	res.send("Erro " + status + " ocorrido: " + (err.message || err.toString()));
});

const server = app.listen(parseInt(process.env.PORT), process.env.IP, () => {
	console.log("Servidor executando na porta http://localhost:3000");
});
