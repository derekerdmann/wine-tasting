var wines = require("./wine.js")

// ID of the next tasting to be created
var tastingID = 1;

// Construct a tasting object
function Tasting( name ) {
    this.id = tastingID++;
    this.name = name;
    this.users = []
    this.wines = []
}

// Currently active tastings
var tastings = {}

/*
 * GET list of tastings
 */
exports.list = function(req, res){
    res.render('tastings', {
        title: 'Tastings',
        tastings: tastings
    });
};

/*
 * POST list of tastings
 */
exports.create = function(req, res){
    var tasting = new Tasting(req.body.name);
    tastings[tasting.id] = tasting;
    res.render('tastings', { 
        title: 'Tastings',
        tastings: tastings
    });
};

/*
 * GET individual tasting
 */
exports.show = function(req, res){
    var tasting = tastings[+req.params.id];
    res.render('tasting', {
        title: tasting.name,
        tasting: tasting,
        wines: wines.all()
    });
};

/*
 * POST changes to individual tasting
 */
exports.update = function(req, res){
    var tasting = tastings[+req.params.id];
    tasting.wines.push(wines.get(+req.body.newwine));
    res.redirect(303, "/tasting/" + req.params.id);
};