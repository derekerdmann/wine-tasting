var userID = 1;

// Construct a user object
function User(name, color) {
    this.id = userID++;
    this.name = name;
    this.color = color;
}

// All users in the system
var users = {}

// Colors that can be used for users
exports.colors = function() {
    return ["#0E657E", "#50D6FF", "#2BA6CB", "#7E4001", "#CB7B2B"];
}

// GET for the new user form
exports.new = function(req, res) {
  res.render('users/new', {
      user: req.session.user,
      title: 'Join the tasting',
      colors: exports.colors()
  });
};

// POST to make a new user
exports.create = function(req, res) {
    var user = new User(req.body.name, req.body.color);
    users[user.id] = user;
    req.session.user = user;
    res.redirect(303, "/");   
};

exports.logout = function(req, res) {
    req.session.user = null;
    res.redirect(303, "/");   
}