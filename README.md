# Full-Stack User Management App

A complete full-stack web application with React frontend, Express backend, and MySQL database. Features complete CRUD operations for user management.

## Features

- **Create Users** - Add new users with names
- **Read Users** - View all users in a clean list
- **Update Users** - Edit existing user names inline
- **Delete Users** - Remove users with confirmation
- **Real-time UI** - Instant updates without page refresh
- **Responsive Design** - Works on desktop and mobile
- **Error Handling** - Proper error messages and validation

## Project Structure

```
fullstack-web-application/
├── README.md
├── database-setup.sql          # Database schema and sample data
├── server/
│   ├── package.json
│   ├── index.js                # Express API server
│   └── .env                    # Database configuration
└── client/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx             # React user interface
        └── App.css             # Styling
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)

### 1. Clone & Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Database Setup (MySQL)

#### Quick Setup (Recommended - 2 minutes)

1. **Install MySQL** (if not already installed):
   - Download: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP (includes MySQL)
   - Start MySQL service

2. **Run the automated setup script**:
   ```bash
   # From project root directory
   mysql -u root -p < database-setup.sql
   ```
   - Enter your MySQL root password when prompted
   - This creates the database, table, and sample data automatically

3. **Verify setup**:
   ```bash
   mysql -u root -p -e "USE env_test; SELECT * FROM users;"
   ```

#### Manual Setup (Step-by-Step)

If you prefer to set up manually or need custom configuration:

1. **Connect to MySQL**:
   ```bash
   mysql -u root -p
   # Enter your password
   ```

2. **Create database and table**:
   ```sql
   -- Create the database
   CREATE DATABASE IF NOT EXISTS env_test
   CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

   -- Switch to the database
   USE env_test;

   -- Create users table
   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Optional: Add sample data
   INSERT INTO users (name) VALUES
   ('John Doe'),
   ('Jane Smith'),
   ('Bob Johnson');
   ```

3. **Exit MySQL**:
   ```sql
   EXIT;
   ```

#### Environment Configuration

Create/update `server/.env` file:

```env
# Database Configuration
DB_HOST=localhost          # MySQL server location
DB_PORT=3306              # MySQL port (default: 3306)
DB_USER=root              # Your MySQL username
DB_PASSWORD=your_password # Your MySQL password (leave empty if no password)
DB_NAME=env_test          # Database name

# Server Configuration
PORT=3001                 # Express server port
```

**Common configurations:**
- **XAMPP default**: `DB_USER=root`, `DB_PASSWORD=""` (empty)
- **Local MySQL**: `DB_USER=root`, `DB_PASSWORD=your_password`
- **Remote MySQL**: Update `DB_HOST` to your server IP

#### Verify Database Connection

1. **Test MySQL connection**:
   ```bash
   mysql -u root -p -e "SELECT VERSION();"
   ```

2. **Check if database exists**:
   ```bash
   mysql -u root -p -e "SHOW DATABASES LIKE 'env_test';"
   ```

3. **Check table structure**:
   ```bash
   mysql -u root -p -e "USE env_test; DESCRIBE users;"
   ```

4. **View sample data**:
   ```bash
   mysql -u root -p -e "USE env_test; SELECT * FROM users;"
   ```

#### Troubleshooting Database Issues

**"Access denied" error:**
- Check your MySQL credentials in `.env`
- Try: `mysql -u root -p` to verify login works
- Reset password if needed: https://dev.mysql.com/doc/mysql-windows-excerpt/8.0/en/resetting-permissions.html

**"Can't connect to MySQL server" error:**
- Ensure MySQL service is running: `net start MySQL80` (Windows)
- Check if port 3306 is available: `netstat -an | find "3306"`
- Try different host: `DB_HOST=127.0.0.1`

**Database doesn't exist:**
- Run the setup script again: `mysql -u root -p < database-setup.sql`
- Or create manually using the SQL commands above

**Port already in use:**
- Change `DB_PORT` in `.env` to `3307` or another available port
- Update MySQL configuration if needed

**Connection timeout:**
- Check firewall settings
- Try `DB_HOST=127.0.0.1` instead of `localhost`
- Increase connection timeout in MySQL config

#### Database Schema Reference

```sql
-- Users table structure
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,    -- Unique identifier
  name VARCHAR(255) NOT NULL,            -- User name (required)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Auto-generated timestamp
);

-- Indexes (automatically created)
-- PRIMARY KEY on 'id'
-- No additional indexes needed for this simple app
```

#### Reset Database (if needed)

To completely reset the database:

```bash
# Drop and recreate
mysql -u root -p -e "DROP DATABASE IF EXISTS env_test;"
mysql -u root -p < database-setup.sql
```

#### Pro Tips

- **Backup regularly**: `mysqldump -u root -p env_test > backup.sql`
- **Use environment variables**: Never commit passwords to git
- **Connection pooling**: Already configured in the app (10 connections)
- **UTF8 support**: Database uses utf8mb4 for international characters
```

### 3. Run the Application

```bash
# Terminal 1: Start backend server
cd server
npm start

# Terminal 2: Start frontend dev server
cd ../client
npm run dev
```

### 4. Access the App
- Frontend: `http://localhost:5173` (or the port shown by Vite)
- Backend API: `http://localhost:3001`

## API Endpoints

| Method | Endpoint          | Body              | Description          |
|--------|-------------------|-------------------|----------------------|
| GET    | `/users`          | -                 | Get all users        |
| POST   | `/add-user`       | `{ "name": "..." }` | Create new user      |
| PUT    | `/update-user/:id`| `{ "name": "..." }` | Update user by ID    |
| DELETE | `/delete-user/:id`| -                 | Delete user by ID    |

### Example API Usage

```bash
# Get all users
curl http://localhost:3001/users

# Add a user
curl -X POST http://localhost:3001/add-user \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'

# Update a user
curl -X PUT http://localhost:3001/update-user/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe"}'

# Delete a user
curl -X DELETE http://localhost:3001/delete-user/1
```

## Development

### Available Scripts

```bash
# Backend
cd server
npm start          # Start production server
npm run dev        # Start with nodemon (if installed)

# Frontend
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Environment Variables

Create `server/.env` with:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=env_test

# Server Configuration
PORT=3001
```

## Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing the Application

1. **Add Users**: Enter names in the input field and click "Add"
2. **Edit Users**: Click the "Edit" button next to any user, modify the name, and save
3. **Delete Users**: Click "Delete" and confirm in the popup
4. **View Users**: All users are displayed with their ID and creation timestamp

## Deployment

### Backend Deployment
```bash
cd server
npm run build  # If you add a build script
npm start
```

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the 'dist' folder to your web server
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

**Built with:** React, Express.js, MySQL, Vite, Node.js
