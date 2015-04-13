/**
 * Toda função utilizada com phantom.evaluate sera executada
 * com eval, dessa forma nao tem como passar parametro para
 * funcao nos moldes tradicionais, sendo assim temos que fazer
 * essa prezepada abaixo!
 */
exports.hack = function(func, params) {
    var source = func.toString();

    for (var attr in params) {
        source = source.replace("{{"+attr+"}}", params[attr]);
    }

    return source;
}
