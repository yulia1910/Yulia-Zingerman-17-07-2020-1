var express = require("express");
var app = express();
app.use(express.static('./dist/weather'));
app.get('/*', function(req, res){
    res.sendFile('index.html', {root: 'dist/weather/'});
});
app.listen(process.env.PORT || 4800);