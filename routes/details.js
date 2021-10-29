const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:resourceid", (req, res) => {
    let result = {user_id: req.session.user_id};
    db.query(`select * from resources where id=$1`, [req.params.resourceid])
    .then(({rows}) => {
      result.resource = rows[0];
      db.query(`select * from users where id=$1`, [result.resource.user_id])
      .then(({rows}) => {
        result.user = rows[0]
        db.query(`select reviews.*, users.name from reviews join users on users.id=reviews.user_id where resource_id=$1`, [req.params.resourceid])
        .then(({rows}) => {
          result.reviews = rows
          res.render('postDetails', result)
        })
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
