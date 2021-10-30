const express = require('express');
const router  = express.Router();

module.exports = () => {
// Logout route to clear cookie
  router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/');
});
  return router;
};
