
const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/download", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  const command = `yt-dlp -g "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      return res
        .status(500)
        .json({ error: stderr || error.message || "Download failed" });
    }
    const downloadLink = stdout.trim().split("\n")[0];
    res.json({ downloadLink });
  });
});

app.listen(PORT, () => {
  console.log(`yt-dlp API server running at http://localhost:${PORT}`);
});
