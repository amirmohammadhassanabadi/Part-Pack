require("dotenv").config();
const connectDB = require("./src/config/database");
const app = require("./src/app");

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});