const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const UserModel = require("./models/user");
const ItemModel = require("./models/InventoryItem");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.get("/items", async (req, res) => {
  try {
    const items = await ItemModel.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/items/:identifier", async (req, res) => {
  const { identifier } = req.params;
  try {
    const item = await ItemModel.findOne({ identifier: identifier });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/items", async (req, res) => {
  const {
    identifier,
    name,
    supplier,
    location,
    quantity,
    description,
    price,
    category,
  } = req.body;
  const newItem = new ItemModel({
    identifier,
    name,
    supplier,
    location,
    quantity,
    description,
    price,
    category,
  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/items/:identifier", async (req, res) => {
  const { identifier } = req.params;

  if (!identifier) {
    return res
      .status(400)
      .json({ message: "undefined" });
  }

  try {
    const deletedItem = await ItemModel.findOneAndDelete({ identifier });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/items/:identifier", async (req, res) => {
  const { identifier } = req.params;

  if (!identifier) {
    return res
      .status(400)
      .json({ message: "Item identifier is missing or undefined" });
  }

  const { name, supplier, location, quantity, description, price, category } =
    req.body;

  try {
    const updatedItem = await ItemModel.findOneAndUpdate(
      { identifier },
      {
        name,
        supplier,
        location,
        quantity,
        description,
        price,
        category,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { email: user.email, role: user.role },
          secretKey,
          { expiresIn: "1h" }
        );
        res.json({ token, message: "Success", role: user.role });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(401).json({ message: "Incorrect email" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const newUser = await UserModel.create({
      role,
      email,
      password: hashedPassword,
    });

    // Generate a token
    const token = jwt.sign(
      { email: newUser.email, role: newUser.role },
      secretKey,
      { expiresIn: "1h" }
    );

    // Return the token in the response
    res.json({newUser,token});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
  console.log(`Server started on port`);
});
