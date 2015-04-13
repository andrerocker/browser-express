/**
 * Exportando funcionalidades de login
 */
var login = require("./login");
exports.sessionLoginEvaluate = login.sessionLoginEvaluate;
exports.sessionLoginCheckResponse = login.sessionLoginCheckResponse;

/**
 * Exportando funcionalidades de doação
 */

var donate = require("./donate");
exports.donateStart = donate.donateStart;
exports.donationNavigateToForm = donate.donationNavigateToForm;
