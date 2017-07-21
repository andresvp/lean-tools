var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname));
app.use(function (req, res, next) {
  var newURL;

  // If not on HTTPS, or not on the main domain, redirect
  if (process.env.NODE_ENV === 'production' &&
    (req.headers['x-forwarded-proto'] !== 'https' || req.headers.host !== 'hjnilsson.com')) {

    newURL = ['https://hjnilsson.com', req.url].join('');
    return res.redirect(newURL);
  }

  return next();
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);