/*
 * All routes for resources are defined here
 * Since this file is loaded in server.js into api/resources,
 *   these routes are mounted onto /resources
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = (req.session.user_id);
    const value = [user];
    let query = `SELECT * FROM resources WHERE user_id = $1`;
    console.log(query);
    console.log(user)
    db.query(query, value)
      .then(data => {
        const resources = data.rows;
        res.render
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
