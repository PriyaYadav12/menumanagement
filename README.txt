# Project Title

A menu Management project

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)


## Technologies Used

- Laravel (9)
- React (18.3.1)
- [Other technologies/frameworks, e.g., Axios, Recoil, etc.]
- [Database, e.g., Postgres, etc.]


## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/priyayadav12/menumanagement.git
   cd your-repo
2. composer install
3.cp .env.example .env
4.Download postgres and update the env file with your creds
5.php artisan migrate
Run this sql 
  INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(74, 'Users', 53, 2, '2024-10-30 00:01:23.000', '2024-10-30 00:01:23.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(75, 'user registrations', 74, 1, '2024-10-30 00:01:46.000', '2024-10-30 00:05:43.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(38, 'system management', NULL, 0, '2024-10-21 19:27:42.000', '2024-10-21 19:27:42.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(51, 'system management', 38, 1, '2024-10-21 20:11:42.000', '2024-10-21 20:11:42.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(53, 'Users & Groups', 51, 2, '2024-10-21 20:13:13.000', '2024-10-21 20:13:13.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(52, 'Systems', 51, 1, '2024-10-21 20:12:39.000', '2024-10-21 20:12:39.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(54, 'System Code', 52, 1, '2024-10-21 20:15:44.000', '2024-10-21 20:15:44.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(55, 'Code Registration - 2', 52, 2, '2024-10-21 20:15:44.000', '2024-10-21 20:15:44.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(57, 'Menus', 52, 4, '2024-10-21 20:15:44.000', '2024-10-21 20:15:44.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(58, 'API List', 52, 5, '2024-10-21 20:15:44.000', '2024-10-21 20:15:44.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(60, 'Menu Registration', 57, 1, '2024-10-21 20:16:41.000', '2024-10-21 20:16:41.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(61, 'API Registration', 58, 1, '2024-10-21 20:17:43.000', '2024-10-21 20:17:43.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(62, 'API Edit', 58, 2, '2024-10-21 20:17:43.000', '2024-10-21 20:17:43.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(64, 'Groups', 53, 2, '2024-10-21 20:18:13.000', '2024-10-21 20:18:13.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(66, 'User Groups Registration', 64, 1, '2024-10-21 20:19:06.000', '2024-10-21 20:19:06.000');
INSERT INTO menus
(id, "name", parent_id, "depth", created_at, updated_at)
VALUES(59, 'Code Registration', 54, 1, '2024-10-21 20:16:17.000', '2024-10-21 20:16:17.000');
  
6.npm install  
7. php artisan serve and npm run dev
