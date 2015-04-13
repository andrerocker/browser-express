var logger = require("morgan");
var phantom = require("phantom");
var express = require("express");
var bodyParser = require("body-parser");
var evaluation = require("./util/evaluations");

var application = express();
var clientInstances = new Array();

/**
 * Configuração Padrao
 */
var loginUrl = "https://www.nfp.fazenda.sp.gov.br/login.aspx";
var donateUrl = "https://www.nfp.fazenda.sp.gov.br/EntidadesFilantropicas/CadastroNotaEntidadeAviso.aspx"

var userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5)";
    userAgent += "AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1";

/**
 * Configuração basicas para o Express
 */
application.use(logger());
application.use(bodyParser.urlencoded({extended: true}));
application.use("/static", express.static(__dirname + "/static"));

/**
 * Cria uma nova sessão de navegador para o usuario e atribui no array local
 */
application.post("/session/:name/new", function (request, response) {
    phantom.create(function (ph) {
        ph.createPage(function (page) {
            page.set("settings.userAgent", userAgent);
            page.set("viewportSize", {width: 1024, height: 728});
            clientInstances[request.params.name] = page;
            response.send(200, {message: "Instancia criada com sucesso"})
        });
    });
});

/**
 * Inicializa a pagina executa login
 */
application.post("/session/:name/login", function (request, response) {
    var page = clientInstances[request.params.name];
    var username = request.body.username;
    var password = request.body.password;

    var checkLoginSnippet = evaluation.sessionLoginEvaluate(username, password);
    var checkLoginResponseFlow = evaluation.sessionLoginCheckResponse(page, function(success) {
        if(success) {
            response.send(200, { message: "Usuario logado com sucesso!" })
        } else {
            response.send(401, { message: "Usuario não autorizado!" })
        }
    });

    page.open(loginUrl, function (status) {
        page.evaluate(checkLoginSnippet, checkLoginResponseFlow);
    });
});

/**
 * Captura titulo da pagina
 */
application.get("/session/:name/print", function (request, response) {
    var page = clientInstances[request.params.name];
    var printImageUrl = "static/prints/"+new Date().getTime()+".png";
    page.render(printImageUrl, function () {
        response.send(200, {
            message: "Print Gerado com sucesso!",
            imageUrl: printImageUrl
        });
    });
});

/**
 * Inicializa fluxo para doação, navega ate a pagina de cadastro de
 * cupons fiscais
 */
application.post("/session/:name/donate/start", function (request, response) {
    var page = clientInstances[request.params.name];

    page.open(donateUrl, function() {
        page.evaluate(evaluation.donateStart, evaluation.donationNavigateToForm(page, function() {
             response.send(200, { message: "Chegamos na pagina de cadastro!" });
        }));
    });
});

application.listen(8081);
