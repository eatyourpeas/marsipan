/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.getAbout = function(req, res) {
  res.render('about', {
    title: 'About Us'
  });
};

exports.getPublications = function(req, res) {
  res.render('publications', {
    title: 'Publications'
  });
};