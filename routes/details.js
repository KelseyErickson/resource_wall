const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:resourceid", (req, res) => {
    let query = `SELECT reviews.*, resources.*, users.name as user_name
                FROM reviews
                JOIN users on user_id = users.id
                JOIN resources on resource_id = resources.id
                WHERE reviews.id = $1
                Group by reviews.id, users.id, resources.id`
                ;
    const keyWord = req.params.resourceid;
    let params = [`${keyWord}`];
    console.log(query);
    db.query(query, params)
      .then(data => {
        let templateVars = (data.rows[0])
        console.log(templateVars)
        res.render('./postDetails', templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

