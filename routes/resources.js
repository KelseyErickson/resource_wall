// Resource Routes
const { query } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM resources
                ORDER BY rating`;
    db.query(query)
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Route to get seach parameter and query with that parameter
  router.get("/:searchId", (req, res) => {
    const keyWord = req.params.searchId;
    let query = `SELECT * FROM resources WHERE UPPER(title) LIKE UPPER($1)`;
    let params = [`%${keyWord}%`];
    db.query(query, params)
      .then((data) => {
        const resources = data.rows;
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Add comments to detaills page
  router.post("/:id/reviews", (req, res) => {
    db.query(
      `insert into reviews (user_id, resource_id, comment) values ($1, $2,$3);`,
      [req.session.user_id, req.params.id, req.body.comment]
    ).then((data) => {
      res.redirect("/details/" + req.params.id);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //Add an upvote
  router.post("/:id/upvote", (req, res) => {
    db.query(
      ` Update resources SET rating = rating +1 WHERE resources.id = $1 ;`,
      [req.params.id]
    ).then((data) => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //Add a downvote
  router.post("/:id/downvote", (req, res) => {
    db.query(
      ` Update resources SET rating = rating -1 WHERE resources.id = $1 ;`,
      [req.params.id]
    ).then((data) => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


 // Add Liked resource to walls
  router.post("/:id/like", (req, res)=> {
    db.query(` insert into walls (user_id, resource_id) values ($1, $2);`, [req.session.user_id, req.params.id])
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })


  // Add a resource
  router.post("/:id/newPost", (req, res) => {
    db.query(
      `insert into resources (user_id, tag_id, title, description, url, thumbnail_photo_url)
    values ($1, $2, $3, $4, $5, $6);`,
      [
        req.session.user_id,
        req.body.tag,
        req.body.title,
        req.body.description,
        req.body.linkURL,
        req.body.imageURL,
      ]
    );
  });

  return router;
};
