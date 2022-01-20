const express = require("express");
const path = require("path");
const Campground = require("./models/campground");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
const app = express();

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res, next) => {
  const campgrounds = await Campground.find({});
  console.log(campgrounds);
  res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res, next) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

app.post("/campgrounds", async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`campgrounds/${campground._id}`);
});

app.get("/campgrounds/:id/edit", async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  campground.title = req.body.campground.title;
  campground.location = req.body.campground.location;
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.delete("/campgrounds/:id", async (req, res, next) => {
  const campground = await Campground.findByIdAndDelete(req.params.id);
  res.redirect("/campgrounds");
});

app.listen(3000, () => {
  console.log("We are working on server 3000!");
});
