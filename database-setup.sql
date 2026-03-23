-- Create the database
CREATE DATABASE IF NOT EXISTS env_test;

-- Use the database
USE env_test;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Insert some sample data
INSERT INTO users (name) VALUES
('John Doe'),
('Jane Smith'),
('Bob Johnson');