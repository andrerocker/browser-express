var util = require("./util");

/**
 * Interage no formulario preenchendo compos de login e senha
 * em seguida aciona o envio dos dados ao servidor
 */
exports.sessionLoginEvaluate = function (username, password) {
    var login = function() {
        var username = "{{username}}";
        var password = "{{password}}";

        $("#UserName").val(username);
        $("#Password").val(password);
        $("#Login").click();

       return username;
    };

    return util.hack(login, {
        "username": username,
        "password": password
    });
};

/**
 * Identifica se o login foi bem sucedido ou não e chama callback
 * com o resultado
 */
exports.sessionLoginCheckResponse = function (page, callback) {
    var testLogin = function() {
        if($("#dadosDoUsuario").size() > 0) {
            return { status: true };
        } else if($("#lblErroMaster").text() != "") {
            return { status: false };
        }

        return null;
    };

    var testLoginResponse = function(response) {
        if(response) {
            callback(response["status"]);
        } else {
            exports.sessionLoginCheckResponse(page, callback);
        }
    };

    setTimeout(function() {
        page.evaluate(testLogin, testLoginResponse);
    }, 500);
}
