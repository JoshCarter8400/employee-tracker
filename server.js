const express = require("express");
const db = require("./db/database");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
// app.use("/api");

// Default response for any other (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
