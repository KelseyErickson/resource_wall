const express = require('express');
const router  = express.Router();

module.exports = () => {
  // Route to Render and pass cookies to newPost route
  router.get("/", (req, res) => {
    const templateVars = {
      user_id: req.session.user_id
    };
    res.render("newPost", templateVars);
  });
  return router;
};
