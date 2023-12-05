const helpers = {};

helpers.checkSessionActive =(req, res, next) => {
    if (req.session.token) {
      return res.redirect('/chat');
    }
    next();
  }



  
  module.exports = helpers;
  