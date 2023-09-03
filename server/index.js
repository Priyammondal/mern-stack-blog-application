const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { User, Article } = require("./model/model.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "secret@jwt#1290@kuchbhi&chalega";
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database successfully connected"))
  .catch((err) => {
    console.log(`Database connection error: ${err.message}`);
    process.exit(1);
  });
app.get("/", (req, res) => {
  res.send("Helow World!");
});

const checkEmailMiddleWare = async (req, res, next) => {
  const { email } = req.body;
  const isEmailTaken = async (email) => {
    const user = await User.findOne({ email });
    return !!user;
  };
  try {
    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      return res.status(400).json({ error: "Email is already taken." });
    }
    // If email is not taken, move to the next middleware
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const authMiddleWare = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    jwt.verify(token, jwtSecret);
  } catch (error) {
    return res.status(400).json({ error: "Unauthorized Access" });
  }
  next();
};

app.post("/registration", checkEmailMiddleWare, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    const data = await User.find();
    return res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await User.find({ email: email, password: password });

  if (data.length > 0) {
    console.log("heelow1");
    const payload = {
      id: data[0]._id,
      name: data[0].name,
      email: data[0].email,
      password: data[0].password,
    };
    const expiresIn = 60;
    const token = jwt.sign(payload, jwtSecret, { expiresIn });
    return res.status(200).json({ data, token, type: "Bearer" });
  } else {
    console.log("heelow2");
    return res.status(404).json({ message: "User Not Found!" });
  }
});

app.post("/createArtilcle", authMiddleWare, async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    // Create a new article
    const newArticle = new Article({ title, content });
    await newArticle.save();

    // Find the user by their ID and add the new article's ObjectId to their articles array
    const user = await User.findById(userId);
    user.articles.push(newArticle._id);
    await user.save();

    return res.status(200).json({ message: "Article created successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getArticles/:userId", authMiddleWare, async (req, res) => {
  const userId = req.params.userId;
  // Find the user by their ID and populate their articles
  const user = await User.findById(userId).populate("articles");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user.articles);
});

app.listen(5050, () => {
  console.log("server connected!");
});
