/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.get("/:id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });

  return router;
};

