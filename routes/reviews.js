/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/:id", (req, res)=> {
    console.log(req.params.id)
    db.query(`"UPDATE resources SET rating = rating + 1 WHERE resource.id = $1;`, [req.params.id])
    .then(data => {
      res.redirect("/index")
    })
  })


  return router;
};
