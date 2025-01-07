import app from "./app";
import sequelize from "./utils/database";

const PORT = 3000;

// Sync Sequelize models and start the server
sequelize
  .sync({ force: false }) // Set to true for dropping and recreating the tables on each restart
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });
