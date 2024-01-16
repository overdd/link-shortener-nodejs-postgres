# link-shortener-nodejs-postgres
URL shortener running on Node.js with PostgreSQL as a storage solution. Sequelize is used as ORM tool.

# How to run the app?

1. Pull the repo.
2. Execute ```npm i```.
3. Install PostrgeSQL on your machine. Restart the system if needed.
4. Rename ```.env.example``` file to ```.env``` and fill it with valid PostgreSQL credentials.
5. Run ```npm run migrate``` to create a table in PostgreSQL.
6. Start the app by running ```npm run start```.
7. Open ```localhost:[PORT from .env file]``` and enjoy!