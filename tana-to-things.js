const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Whitelist specific origins for CORS
const corsOptions = {
  origin: ["https://app.tana.inc"], // This allows only requests from "https://app.tana.inc"
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions)); // Use CORS with the options defined above

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post("/tana-to-things", (req, res) => {
  let title = req.body.title || "DefaultTitle"; // Replace 'DefaultTitle' with any default value you'd like

  exec(
    `open "things:///add?title=${encodeURIComponent(title)}"`,
    (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send("Error occurred: " + error.message);
      }
      res.send("URL Triggered");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
