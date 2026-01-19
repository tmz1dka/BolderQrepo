CREATE DATABASE balder;
USE balder;
CREATE TABLE orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  total DECIMAL(10,2),
  currency VARCHAR(10),
  line_items_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE order_tokens (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255),
  token VARCHAR(255) UNIQUE,
  payload_json JSON,
  expires_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE balder;
SELECT session_id, token, expires_at, payload_json FROM order_tokens;
