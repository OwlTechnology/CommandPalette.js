var page = require("webpage").create();

page.open("http://localhost/examples/basic.html", function(status){
    console.log("Status: " + status);

    if(status === "success"){

    }

    phantom.exit();
});
