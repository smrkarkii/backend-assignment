CREATE DATABASE salesmng;

CREATE TABLE users(
	user_id uuid PRIMARY KEY DEFAULT
	uuid_generate_v4(),
	username VARCHAR (50) NOT NULL,
	user_password VARCHAR (500) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	phone VARCHAR(10) UNIQUE NOT NULL
    );

INSERT INTO users (username,user_password, email, phone) VALUES ('karki','karki','karkismr8@gmail.com', '9713849577');