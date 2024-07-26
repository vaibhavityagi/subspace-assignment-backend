const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/hash_passwords", async (req, res) => {
  console.log(req.body);
  const { password } = req.body;

  if (!password)
    return res.status(400).json({
      error: "Password is required",
    });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return res.status(200).json({
      hashedPassword,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/verify_passwords", async (req, res) => {
  const { plainPassword, hashedPassword } = req.body();
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  console.log(result);
  res.send(200);
});

app.listen(8000, () => console.log("listening on port 8000"));
