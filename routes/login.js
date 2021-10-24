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

  router.get("/", (req, res) => {
    // const templateVars = { user: activeUser([req.session.user_id], users) };
    // res.render("login", templateVars);

      res.render("login");
    });

  return router;
};

