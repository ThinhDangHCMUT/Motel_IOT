use motel_schema2;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    UserType ENUM('admin', 'user') NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Phone VARCHAR(20) NOT NULL
);
CREATE TABLE Room (
    RoomID INT AUTO_INCREMENT PRIMARY KEY,
    RoomName VARCHAR(50) NOT NULL,
    UserID INT NOT NULL,
    RoomType VARCHAR(50) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Reading (
    ReadingID INT AUTO_INCREMENT PRIMARY KEY,
    RoomID INT NOT NULL,
    ElectricReading FLOAT NOT NULL,a
    WaterReading FLOAT NOT NULL,
    ReadingDate DATE NOT NULL,
    FOREIGN KEY (RoomID) REFERENCES Room(RoomID)
);

use motel_schema2;
-- Thêm user admin
INSERT INTO User (Username, Password, UserType, FullName, Email, Phone)
VALUES 	('user20', 'password', 'user', 'User20', 'user20@example.com', '123456789');


-- Thêm 10 phòng
INSERT INTO Room (RoomName, UserID, RoomType)
VALUES ('Phòng 21', 22, 'standard');


-- Thêm dữ liệu điện nước trong room
INSERT INTO Reading (RoomID, ElectricReading, WaterReading, ReadingDate)
VALUES (19, 1199, 2199, '2023-04-01'),
       (19, 1199, 2199, '2023-04-02'),
       (19, 1199, 2199, '2023-04-03'),
       (19, 1199, 2199, '2023-04-04'),
       (19, 1199, 2199, '2023-04-05'),
       (19, 1199, 3199, '2023-04-06'),
       (19, 1199, 3199, '2023-04-07'),
       (19, 1199, 3199, '2023-04-08'),
       (19, 1199, 3199, '2023-04-09'),
       (19, 1199, 3199, '2023-04-10'),
       (19, 2199, 4199, '2023-04-11'),
       (19, 2199, 4199, '2023-04-12'),
       (19, 2199, 4199, '2023-04-13'),
       (19, 2199, 4199, '2023-04-14'),
       (19, 2199, 4199, '2023-04-15'),
       (19, 2199, 5199, '2023-04-16'),
       (19, 2199, 5199, '2023-04-17'),
       (19, 2199, 5199, '2023-04-18'),
       (19, 2199, 5199, '2023-04-19'),
       (19, 2199, 5199, '2023-04-20'),
       (19, 3199, 6199, '2023-04-21'),
       (19, 3199, 6199, '2023-04-22'),
       (19, 3199, 6199, '2023-04-23'),
       (19, 3199, 6199, '2023-04-24'),
       (19, 3199, 6199, '2023-04-25'),
       (19, 3199, 7199, '2023-04-26'),
       (19, 3199, 7199, '2023-04-27'),
       (19, 3199, 7199, '2023-04-28'),
       (19, 3199, 7199, '2023-04-29'),
       (19, 3199, 7199, '2023-04-30');

SELECT r.RoomName, u.FullName, re.ElectricReading, re.WaterReading, re.ReadingDate
FROM Reading re
INNER JOIN Room r ON re.RoomID = r.RoomID
INNER JOIN User u ON r.UserID = u.UserID
WHERE u.UserType = 'admin' OR u.UserType = 'user'
ORDER BY re.ReadingDate DESC;


SELECT re.ElectricReading, re.WaterReading, re.ReadingDate, r.roomName, r.roomType, u.Email, u.UserName
FROM reading re 
JOIN room r ON r.RoomID = re.RoomID
JOIN user u ON u.UserID = r.UserID
WHERE r.RoomID = '3';

SELECT * FROM user JOIN Room ON user.UserID = Room.UserID WHERE Username = 'user1' AND Password = 'password';

SELECT RoomID, RoomName, FullName, Phone, RoomType FROM Room r INNER JOIN User u ON r.UserID = u.UserID