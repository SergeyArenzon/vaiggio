const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const express = require("express");
require('dotenv').config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// import {} from './../services/connectDB'
const x = require("../services/db");

app.prepare().then(() => {
  const server = express();
  server.get("location", async (req, res) => {
      console.log("test");
    try {
      const locations = await x.getAllLocations();

      res.status(200).header("Access-Control-Allow-Origin", "*").json({ locations: locations });
    } catch (error) {
      res.status(500).json({
        message: "Error in fetchin locations",
        error,
      });
    }
  });
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT || 3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:5000");
      });
});

