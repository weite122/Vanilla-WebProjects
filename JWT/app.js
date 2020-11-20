const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  res.json({
    message: "Post created...",
    userId: req.userData.userId
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "weite122",
    email: "weite122@test.com",
  };

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.username },
    "secret"
  );

  res.json({
    userId: user.id,
    email: user.email,
    token: token,
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decodedToken = jwt.verify(bearerToken, "secret");
    req.userData = { userId: decodedToken.userId };
    next()
  } else {
    res.status(403).json("Auth failed");
  }
}

app.listen(5000, () => console.log("Server running at port 5000"));
