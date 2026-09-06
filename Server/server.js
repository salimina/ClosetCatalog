import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

import db from "./database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/*
  Allow requests from your React frontend.
*/
app.use(cors());

/*
  Allow Express to understand JSON requests.
*/
app.use(express.json());

/*
  Create the uploads folder if it does not already exist.

  You do not need to create it manually.
*/
fs.mkdirSync("uploads", { recursive: true });

/*
  Configure where Multer saves uploaded photos and how it names them.
*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },

  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);

    /*
      Generate a unique name so two photos with the same
      original filename do not overwrite each other.
    */
    const uniqueName = `${crypto.randomUUID()}${extension}`;

    callback(null, uniqueName);
  },
});

/*
  Configure upload restrictions.
*/
const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image files are allowed"));
    }

    callback(null, true);
  },
});

/*
  Make files inside server/uploads publicly accessible.

  For example:
  server/uploads/photo.jpg

  becomes:
  http://localhost:5000/uploads/photo.jpg
*/
app.use("/uploads", express.static("uploads"));

/*
  Basic test route.
*/
app.get("/api/hello", (req, res) => {
  res.json({
    message: "The backend is working!",
  });
});

/*
  Get all clothing items.
*/
app.get("/api/items", (req, res) => {
  const items = db
    .prepare(`
      SELECT *
      FROM clothing_items
      ORDER BY created_at DESC
    `)
    .all();

  res.json(items);
});

/*
  Get one clothing item by its ID.
*/
app.get("/api/items/:id", (req, res) => {
  const item = db
    .prepare(`
      SELECT *
      FROM clothing_items
      WHERE id = ?
    `)
    .get(req.params.id);

  if (!item) {
    return res.status(404).json({
      error: "Item not found",
    });
  }

  res.json(item);
});

/*
  Add a clothing item with one photo.

  "photo" must match the name used by FormData
  in the React frontend.
*/
app.post("/api/items", upload.single("photo"), (req, res) => {
  const { name, category, color, brand, size } = req.body;

  if (!name || !category) {
    return res.status(400).json({
      error: "Name and category are required",
    });
  }

  /*
    req.file exists if the user uploaded a photo.
  */
  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  const result = db
    .prepare(`
      INSERT INTO clothing_items (
        name,
        category,
        color,
        brand,
        size,
        image_url
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .run(
      name,
      category,
      color || null,
      brand || null,
      size || null,
      imageUrl
    );

  /*
    Read the newly created item from the database.
  */
  const newItem = db
    .prepare(`
      SELECT *
      FROM clothing_items
      WHERE id = ?
    `)
    .get(result.lastInsertRowid);

  res.status(201).json(newItem);
});

/*
  Delete an item.
*/
app.delete("/api/items/:id", (req, res) => {
  const item = db
    .prepare(`
      SELECT *
      FROM clothing_items
      WHERE id = ?
    `)
    .get(req.params.id);

  if (!item) {
    return res.status(404).json({
      error: "Item not found",
    });
  }

  db.prepare(`
    DELETE FROM clothing_items
    WHERE id = ?
  `).run(req.params.id);

  /*
    Also remove its photo from the uploads folder.
  */
  if (item.image_url) {
    const filename = path.basename(item.image_url);
    const photoPath = path.join("uploads", filename);

    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }
  }

  res.status(204).send();
});

/*
  Handle upload errors, such as an invalid file type
  or a file larger than 5 MB.
*/
app.use((error, req, res, next) => {
  console.error(error);

  res.status(400).json({
    error: error.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});