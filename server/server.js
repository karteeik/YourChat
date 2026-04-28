// only start server
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connect error: ", err);
    process.exit(1);
  });
