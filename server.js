const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// "Database" in-memory
const users = {};

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Fill out everything completly ");

  if (users[username]) return res.status(400).send("User already exists");

  const hash = await bcrypt.hash(password, 10);
  users[username] = hash;

  res.send("Registered ✅");
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userHash = users[username];
  if (!userHash) return res.status(400).send("User not found");

  const match = await bcrypt.compare(password, userHash);
  if (!match) return res.status(401).send("Wrong password");

  res.send("Success ✅");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
