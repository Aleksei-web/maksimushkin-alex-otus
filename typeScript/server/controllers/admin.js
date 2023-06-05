const db = require("../db");
const shortid = require('shortid')

class AdminController {
  async createrCompany(req, res) {
    // создать пользователя или изменить
    const { id, name } = req.body;
    console.log(req.body);       
      const user = await db.query(
        `INSERT INTO quiz 
        (email, id_company, id_wokrer, token) 
        values ($1, $2, $3, $4) RETURNING email, token`,
        [email, id_company, id_wokrer, shortid.generate()]
      );
      res.json(user.rows[0]);
    
  }

  async getQuizs(req, res) {
    const id_company = req.params.id
    console.log(id_company);
    const quiz = await db.query(`SELECT * FROM 
    quiz
    WHERE id_company = $1
    AND 
    ts IS NOT NULL
    `, [id_company]);
    res.json(quiz.rows);
  }

  async getOneQuiz(req, res) {
    const token = req.params.token;
    console.log('token', token);
    try {
        if(token) {
        const quiz = await db.query("SELECT * FROM quiz where token = $1", 
        [ token ] );
        if(quiz.rows[0].rating) {
          res.send({'status': 400})
        } else {
          res.sendStatus(200)
        }
      }         
      } catch (error) {
        console.log(error.message);
        res.status(400).send({'status': 400})
        
      }
  }

  async updateQuiz(req, res) {
    try {
      const token = req.params.token;
      const { rating, comment } = req.body;
      const reason = await db.query(
        `UPDATE quiz set 
        rating =  $1,
        comment =  $2,
        ts = $3
        where token = $4 RETURNING *`,
        [rating, comment, new Date(), token]
      );
      res.json(reason.rows[0]);      
    } catch (error) {
      console.log(error.message);
      res.sendStatus(400)
    }
  }

  async test(req, res) {
    const id_company = req.params.id
    const { data } = req.body;
    const ans = []
    for(let i = 0; i < data.length; i++) {
      let a = await db.query(
        `INSERT INTO quiz 
          (id_client, id_company, id_wokrer, token) 
          values ($1, $2, $3, $4) RETURNING email, token`,
          [
            data[i].id_client, 
            id_company, 
            data[i].id_wokrer, 
            shortid.generate()
          ]
        )    
      ans.push(a.rows[0])
    }
    res.json(ans)
  }
}

module.exports = new AdminController();