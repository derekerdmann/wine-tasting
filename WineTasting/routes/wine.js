// ID of the next wine
var wineID = 1;

// Construct Wine
function Wine() {
    this.id = wineID++;
    this.winery = "";
    this.name = "";
    this.vintage = "";
    this.grape = "";
    this.price = 0;
}

var wines = {}

/*
 * GET list of wines
 */
exports.list = function(req, res){
  res.render('wines', { title: 'Wines', wines: wines });
};

/*
 * GET form to add a wine
 */
exports.new = function(req, res){
  res.render('wines/new', { title: 'Add a wine' });
};
