const connection = require('../../db/db');

exports.getLikes = async (req, res) => {

    const checkSql = `SELECT user_iduser FROM likes WHERE  post_idpost = ?`;
    connection.query(checkSql, [req.query.post_idpost],(error, data) => {
        if (error) return res.json(error);
          return res.status(200).json(data)
    })

}

exports.postLikes = async (req, res) => {
    const { user_iduser, post_idpost } = req.body;
    const checkSql = `SELECT * FROM likes WHERE user_iduser = ${user_iduser} AND post_idpost = ${post_idpost}`;
    connection.query(checkSql, (error, data) => {
        if (error) return res.json(error);
        if (data.length > 0) {
            const sql = `DELETE FROM likes WHERE user_iduser = ${user_iduser} AND post_idpost = ${post_idpost}`;
            connection.query(sql, (error, results) => {
              if (error) {
                return res.status(500).json({ message: error.message });
              }
              return res.json({ message: "Vote removed" });
            });
        } else {
            const sql = "INSERT INTO likes(`post_idpost`,`user_iduser`) VALUES (?)";
            const values = [post_idpost, user_iduser];
            connection.query(sql, [values], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.json({ message: "Vote liked" });
            });
        }
    })

}
