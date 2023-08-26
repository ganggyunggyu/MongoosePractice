const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/movies");

main()
  .then(() => {
    console.log("GOOD!!");
  })
  .catch((err) => {
    console.log("ERROR!!");
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/movies");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const movieSchema = new mongoose.Schema({
  title: String,
  content: String,
  opneDate: String,
  reting: String,
  score: Number,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  displayName: String,
});

const Movie = mongoose.model("Movie", movieSchema);
const gogVol3 = new Movie({
  title: "Guardians of the Galaxy Vol. 3",
  content: "awsome Guardians Story",
  openDate: "2023/05/05",
  rating: "R",
  score: 9.2,
});
const User = mongoose.model("User", userSchema);
const user1 = new User({
  email: "qwzx16@naver.com",
  password: "1234",
  displayName: "강경규",
});
