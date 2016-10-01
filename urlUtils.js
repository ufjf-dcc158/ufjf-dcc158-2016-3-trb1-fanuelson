var url = require("url");
//var queryString = require("querystring");

var address = "http://someserver.com/somefolder/somefile.html?somevar=somevalue&othervar=12345";

console.log("host: "+url.parse(address).host);
console.log("path: "+url.parse(address).path);
console.log("pathname: "+url.parse(address).pathname);

var query = url.parse(address, true).query;

console.log("hash: ", url.parse(address).hash);

console.log("query: ", query);

console.log("somevalue: "+query.somevar);
console.log("othervar: "+query.othervar);
