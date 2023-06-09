const mysql = require('mysql2');

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: 'D@ngthinh1402',
//   database: 'motel_schema2'
// });
const pool = mysql.createPool({
  connectionLimit: 10,
  user: "root",
  host: "containers-us-west-207.railway.app",
  password: "QpM2kjzDJrGR03esoFt0",
  database: "railway",
  port : "7552",
  debug: true
});


let db={}

db.loginUser = (username,password) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM User JOIN Room ON User.UserID = Room.UserID WHERE Username = ? AND Password = ?",[username,password], (err, res) => {
      if(err) return reject(err);
      return resolve(res[0]);
    })
  })
}


db.allRooms = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT RoomID, RoomName, FullName, Phone, RoomType FROM Room r INNER JOIN User u ON r.UserID = u.UserID", (err, res) => {
      if(err) return reject(err);
      return resolve(res);
    })
  })
}


db.getRoomByID = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT re.ElectricReading, re.WaterReading, re.ReadingDate, r.roomName, r.roomType, u.Email, u.UserName, u.Phone FROM Reading re JOIN Room r ON r.RoomID = re.RoomID JOIN User u ON u.UserID = r.UserID WHERE r.RoomID = ?`,[id],(err,res) => {
      if(err) return reject(err);
      return resolve(res)
    })
  })
}

module.exports = db;
