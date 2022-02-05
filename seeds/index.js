const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61f7514ebdaa127fb658d6e5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt consectetur sit unde suscipit corporis eveniet quaerat sunt quos eos modi nulla, rerum dolorem laborum iste et ipsum voluptates sed inventore!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/anythingthatworks/image/upload/v1644027043/YelpCamp/hw3p1myodtuye4nglpjp.jpg",
          filename: "YelpCamp/hw3p1myodtuye4nglpjp",
        },
        {
          url: "https://res.cloudinary.com/anythingthatworks/image/upload/v1644027043/YelpCamp/huzvtqd5jdt0fishveai.jpg",
          filename: "YelpCamp/huzvtqd5jdt0fishveai",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
