/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    const templateVars = {

      user_id: req.session.user_id

    };

    res.render("registration", templateVars);
  });

router.post('/', (req, res) => {

    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    const profilePic = req.body.profilePic;

    if (!email || !password || !name) {
      res.redirect('/registration')

    }


    let query = `INSERT INTO users (name, email, password, photo_url)
    values ($1, $2, $3, $4)
    RETURNING *;`;

    let params = [name, email, password, profilePic];
    console.log(query, params)
    db.query(query, params)
      .then(data => {
        req.session.user_id = data.rows[0].id;
        res.redirect('/')
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};
