const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mssg: "healthy",
  });
});

app.post("/hash_passwords", async (req, res) => {
  const { password } = req.body.input;

  if (!password)
    return res.status(400).json({
      message: "Password is required",
    });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return res.status(200).json({
      hashedPassword,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});

app.post("/verify_passwords", async (req, res) => {
  const { plainPassword, hashedPassword } = req.body.input;
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isMatch) return res.json({ message: "Incorrect email/password" });
    return res.status(200).json({
      plainPassword,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});

app.listen(8000, () => console.log("listening on port 8000"));
