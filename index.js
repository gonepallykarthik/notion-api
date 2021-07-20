const getcontent = require("./Notion/notion");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

//path for views
const viewpath = path.join(__dirname, "./partials");
const publicpath = path.join(__dirname, "./public");

//json
app.use(express.json());
app.use(express.static(publicpath));

app.set("view engine", "hbs");
app.set("views", viewpath);

const loadeddata = async () => {
  const resources = await getcontent();
  console.log(resources);
};

app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/data", async (req, res) => {
  const data = await getcontent();
  res.json(data);
});

app.listen(port, () => {
  console.log("server running on", port);
});
