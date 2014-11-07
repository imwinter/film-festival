exports.index = function(req, res) {
    res.sendFile('client/index.html', { 'root': '../' });
}