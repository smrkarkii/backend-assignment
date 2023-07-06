# Project Documentation

This project uses a variety of technologies and languages for its implementation. Below is a detailed guide to the technologies used and instructions on how to run the program locally.

## Technologies Used

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT Tokens

## Local Setup Instructions

### Database Configuration

In the `queries.js` file, replace the placeholders with your PostgreSQL credentials:

```javascript
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});
```

## Installing Dependencies

```bash 
npm install
```

## Environment Variables
Create a .env file in the root directory of the project and add the following line:

```env 
jwtSecret = your_secret_key
```

## Running the server
Start the server using the following command
 
 ```bash 
 npm run dev
 ```

 ## The server runs on 'localhost:3000'
