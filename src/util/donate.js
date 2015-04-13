/***
 * Começamos a navegar ate a pagina de cadastro de cupom
 */

exports.donateStart = function () {
    jQuery("input[value='Prosseguir']").click()
}

exports.donationNavigateToForm = function (page, callback) {
    setTimeout(function () {
        page.evaluate(function () { jQuery("input[value='Nova Nota']").click() }, function () {
            callback();
        });
    }, 1000);
}
