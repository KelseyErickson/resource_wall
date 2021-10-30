const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Route to render register page and pass cookie through
  router.get("/", (req, res) => {
    const templateVars = {
      user_id: req.session.user_id
    };

    res.render("registration", templateVars);
  });

router.post('/', (req, res) => {
// Route to handle registration and set cookie if successful
    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    const profilePic = req.body.profilePic;

    if (!email || !password || !name) {
      res.redirect('/registration');
    }
    let query = `INSERT INTO users (name, email, password, photo_url)
    values ($1, $2, $3, $4)
    RETURNING *;`;

    let params = [name, email, password, profilePic];
    db.query(query, params)
      .then(data => {
        req.session.user_id = data.rows[0].id;
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message })
      });

  });

  return router;
};
