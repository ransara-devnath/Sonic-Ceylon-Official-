const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
}
});

const upload = multer({ storage});

app.post("/upload", upload.fields([{ name: "song"}, { name: "thumbnail"}]), (req, res) => {
    if (!req.files ||!req.files["song"] ||!req.files["thumbnail"]) {
        return res.status(400).json({ success: false, message: "Upload failed!"});
}

    res.json({
        success: true,
        songPath: `/uploads/${req.files["song"][0].filename}`,
        thumbnailPath: `/uploads/${req.files["thumbnail"][0].filename}`
});
});

app.use("/uploads", express.static(uploadDir));

app.listen(3000, () => console.log(`✅ Server running on http://localhost:3000`));