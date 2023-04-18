const express = require('express');
const pool = require('../db');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    let sql = '';
    let values = [];
    if (req.userType === 'admin') {
      sql = `SELECT Room.RoomID, Room.RoomName, User.FullName, Reading.ElectricReading, Reading.WaterReading, Reading.ReadingDate
             FROM Room
             INNER JOIN User ON Room.UserID = User.UserID
             LEFT JOIN Reading ON Room.RoomID = Reading.RoomID
             ORDER BY Room.RoomID, Reading.ReadingDate DESC`;
    } else if (req.userType === 'user') {
      sql = `SELECT Room.RoomID, Room.RoomName, User.FullName, Reading.ElectricReading, Reading.WaterReading, Reading.ReadingDate
             FROM Room
             INNER JOIN User ON Room.UserID = User.UserID
             LEFT JOIN Reading ON Room.RoomID = Reading.RoomID
             WHERE Room.UserID = ?
             ORDER BY Room.RoomID, Reading.ReadingDate DESC`;
      values = [req.userId];
    }

    const [rows] = await pool.query(sql, values);
    const rooms = {};
    for (const row of rows) {
      const roomId = row.RoomID;
      if (!rooms[roomId]) {
        rooms[roomId] = {
          roomId,
          roomName: row.RoomName,
          landlordName: row.FullName,
          readings: [],
        };
      }
      if (row.ElectricReading !== null && row.WaterReading !== null) {
        rooms[roomId].readings.push({
          electricReading: row.ElectricReading,
          waterReading: row.WaterReading,
          readingDate: row.ReadingDate,
        });
      }
    }

    res.json(Object.values(rooms));
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
