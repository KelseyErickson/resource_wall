const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Route to load myZources with liked and created posts
  router.get("/", (req, res) => {

    const user = (req.session.user_id);

    const value = [user];
    let query = `SELECT *
    FROM resources
    WHERE user_id = $1
    OR resources.id IN (SELECT resource_id
    FROM walls WHERE user_id = $1)`;
    db.query(query, value)
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
  return router;
};
