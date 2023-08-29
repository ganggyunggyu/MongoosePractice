/** @format */

const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const CampGround = require('./models/CampGround');
const ObjectId = mongoose.Types.ObjectId;
const methodOverride = require('method-override');

main()
  .then(() => {
    console.log('GOOD!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/camppingApp');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/campgrounds', async (req, res) => {
  const campgrounds = await CampGround.find({});
  res.render('campgrounds/index', { campgrounds });
});
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/campgrounds/new', async (req, res) => {
  res.render('campgrounds/new');
});

app.post(`/campgrounds`, async (req, res) => {
  console.log(req.body);
  const campground = new CampGround(req.body.campground);
  console.log(campground);
  await campground.save();
  res.redirect(`/campgrounds/`);
});

app.get('/campgrounds/show/:id', async (req, res) => {
  const campground = await CampGround.findById(req.params.id);
  console.log(req.params.id);
  res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/update/:id', async (req, res) => {
  const campground = await CampGround.findById(req.params.id);
  console.log(req.params.id);
  res.render('campgrounds/update', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const newCamp = req.body.campground;
  await CampGround.findOneAndUpdate({ _id: id }, newCamp);
  res.redirect(`/campgrounds/show/${id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  await CampGround.findByIdAndDelete(id);
  res.redirect('/campgrounds');
});

app.listen(4000, () => {
  console.log('서버가 4000포트에서 열렸다');
});
