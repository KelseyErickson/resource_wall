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
    let query = `SELECT * FROM resources`;
    console.log(query);
    db.query(query)
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });



  });

// Route to get seach parameter and query with that parameter
  router.get("/:searchId", (req, res) => {
    const keyWord = req.params.searchId;
    let query = `SELECT * FROM resources WHERE UPPER(title) LIKE UPPER($1)`;
    let params = [`%${keyWord}%`];
    db.query(query, params)
      .then(data => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


    console.log(query, params)

  });









  return router;
};
