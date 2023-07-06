CREATE DATABASE salesmng;

CREATE TABLE users(
	user_id uuid PRIMARY KEY DEFAULT
	uuid_generate_v4(),
	username VARCHAR (50) NOT NULL,
	user_password VARCHAR (500) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	phone VARCHAR(10) UNIQUE NOT NULL
    );

CREATE TABLE product (
  product_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  product_name VARCHAR(255) NOT NULL,
  product_description VARCHAR(1000) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL
  );

CREATE TABLE Orders (
  order_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(user_id),
  total_amount DECIMAL(10, 2),
  order_date TIMESTAMP DEFAULT current_timestamp,
  status VARCHAR(255)
);

CREATE TABLE Order_Items (
  order_item_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES Orders(order_id),
  product_id uuid REFERENCES product(product_id),
  quantity INTEGER,
  price DECIMAL(10, 2)
);



INSERT INTO users (username,user_password, email, phone) VALUES ('karki','karki','karkismr8@gmail.com', '9713849577');