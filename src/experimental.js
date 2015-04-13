var phantom = require("phantom");
var evaluations = require("./evaluations");
var homeUrl = "http://localhost:3000/users/sign_in";

phantom.create(function(browser) {
    browser.createPage(function(page) {
        page.set("viewportSize", {width: 1024, height: 728});
        page.open(homeUrl, function(status) {
            page.render("./static/prints/"+new Date().getTime()+".png", function () {
                console.log("Yeahh");
                browser.exit();
            });
        });
    });
});
