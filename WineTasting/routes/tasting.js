
// Currently active tastings
var tastings = {}

// ID of the next tasting to be created
var tastingID = 1;

/*
 * GET list of tastings
 */
exports.list = function(req, res){
  res.render('tastings', { title: 'Tastings', tastings: tastings });
};

/*
 * POST list of tastings
 */
exports.create = function(req, res){
    var id = tastingID++;
    tastings[id] = {
        id: id,
        name: req.body.name,
    };
    res.render('tastings', { title: 'Tastings', tastings: tastings });
};

/*
 * GET individual tasting
 */
exports.show = function(req, res){
    var tasting = tastings[req.params.id];
    res.render('tasting', { title: tasting.name });
};