// Grabs resource from DB and user information to show post details and comments page
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const templateVars = {
      // Grab cookie to see if user is logged in
      user_id: req.session.user_id
    };
      res.render("login", templateVars);
    });

  // Post request to do login checks and set cookie
  router.post('/', (req, res) => {

      const email = req.body.email;
      const password = req.body.password;

      let query = `SELECT * FROM users WHERE email = $1`;
      let params = [email];
      db.query(query, params)
        .then(data => {
          if(data.rows.length === 0){
            return res.render('login')
          }
          if(data.rows[0].password !== req.body.password){
            return res.render('login')
          }
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
