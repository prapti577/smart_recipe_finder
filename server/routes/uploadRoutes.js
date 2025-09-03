const express = require("express");
const multer = require("multer");
const { put } = require("@vercel/blob");
const router = express.Router();

// Store file in memory instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/profile", upload.single("profilePic"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Vercel Blob
    const blob = await put(`recipes/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
      access: "public", // makes it accessible via URL
    });

    res.json({ imageUrl: blob.url }); // return the public URL
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
