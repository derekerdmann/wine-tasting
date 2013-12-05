// ID of the next wine
var wineID = 1;

// Construct Wine
function Wine() {
    this.id = wineID++;
    this.winery = "";
    this.name = "";
    this.vintage = "";
    this.grape = "";
    this.price = "";
    this.abv = "";
}

// displays the wine name nicely
Wine.prototype.prettyName = function() {
    return (this.winery + " " + this.name).trim();
};

var wines = {}

// Returns all the wines
exports.all = function() {
    return wines;
}


// Returns all the wines
exports.get = function(id) {
    return wines[id];
}

/*
 * GET list of wines
 */
exports.list = function(req, res){
  res.render('wines/wines', {
      user: req.session.user,
      title: 'Wines',
      wines: wines
  });
};

/*
 * GET form to add a wine
 */
exports.new = function(req, res){
  res.render('wines/new', {
      user: req.session.user,
      title: 'Add a wine'
  });
};

/*
 * POST form to add a wine
 */
exports.create = function(req, res){
    var wine = new Wine();
    wine.name = req.body.name
    wine.winery = req.body.winery
    wine.grape = req.body.grape
    wine.vintage = req.body.vintage
    wine.price = req.body.price
    wine.abv = req.body.abv

    wines[wine.id] = wine;
    res.redirect(303, "/tastings");
};

/*
 * GET individual wine
 */
exports.show = function(req, res){
    var wine = wines[req.params.id];
    res.render('wines/show', {
        user: req.session.user,
        title: wine.name
    });
};

