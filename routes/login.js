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

      res.render("login", templateVars);
    });

  router.post('/', (req, res) => {

      const email = req.body.email;
      const password = req.body.password;

      let query = `SELECT * FROM users WHERE email = $1`;
      let params = [email];
      console.log(query, params)
      db.query(query, params)
        .then(data => {
          console.log(data.rows)
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
