var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var secure = require('express-force-https');

app = express();
app.use(serveStatic(__dirname));
app.use(secure);

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);