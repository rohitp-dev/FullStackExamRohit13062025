# Backend Project

## Node Version
This project uses Node.js version 22.

## Installation Steps
1. Clone the repository.
2. Run `npm install` to install all dependencies.

## Setup Environment Variables
Create a `.env` file in the root directory and add the following environment variables for both MongoDB and MySQL databases, as well as JWT and server port configuration:

```
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/your_db

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=your_db

# JWT
JWT_SECRET=your_secret
```

## Seed Script Steps
1. Ensure the MySQL database connection is successful.
2. Run the seed script to populate initial data for products:
   ```bash
   npm run seed:products
   ```
3. The seed script will insert the necessary initial data into the database.

## Running the Project
After running the seed script, start the project using the following command:
```bash
npm start
