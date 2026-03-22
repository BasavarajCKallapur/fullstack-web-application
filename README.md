# Full-stack environment test (minimal)

React + Express + MySQL. Use this to verify your machine can run all three.

## Folder structure

```
fullstack-web-application/
├── README.md
├── .gitignore
├── server/
│   ├── package.json
│   ├── index.js
│   └── .env.example
└── client/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── App.css
```

## MySQL setup (step by step)

1. **Install MySQL** if needed (Windows: [MySQL Installer](https://dev.mysql.com/downloads/installer/) or use XAMPP/WAMP with MySQL).

2. **Start the MySQL service** (Services app on Windows, or `net start MySQL80` if that is your service name).

3. **Open a MySQL client** (MySQL Shell, `mysql` CLI, or MySQL Workbench) and log in as `root` (or your admin user).

4. **Create the database:**

   ```sql
   CREATE DATABASE env_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE env_test;
   ```

5. **Create the `users` table:**

   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

6. **Connection config for this app** (matches `server/.env`):

   | Variable       | Typical value   |
   | -------------- | --------------- |
   | `DB_HOST`      | `localhost`     |
   | `DB_PORT`      | `3306`          |
   | `DB_USER`      | `root` (or your user) |
   | `DB_PASSWORD`  | Your MySQL password   |
   | `DB_NAME`      | `env_test`      |

7. **Configure the backend:** copy `server/.env.example` to `server/.env` and set `DB_PASSWORD` (and other fields if yours differ).

## Install dependencies

From the project root (PowerShell):

```powershell
cd server; npm install
cd ..\client; npm install
```

(On older PowerShell, run each `cd` / `npm` line separately if `;` fails.)

## Run the backend

```powershell
cd server; npm start
```

You should see: `API http://localhost:3001`

Leave this terminal open.

## Run the frontend

Open a **second** terminal:

```powershell
cd client; npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The dev server **proxies** `/users` and `/add-user` to the API on port 3001, so you do not need to set CORS origins manually for local dev.

## What to verify

1. Backend: `http://localhost:3001/users` returns JSON `[]` (or a list of users).
2. Frontend: enter a name, click **Add**, and see it in the list after refresh.

## API summary

| Method | Path        | Body              | Description        |
| ------ | ----------- | ----------------- | ------------------ |
| POST   | `/add-user` | `{ "name": "..." }` | Insert a user    |
| GET    | `/users`    | —                 | List users         |
