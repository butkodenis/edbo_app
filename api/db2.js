const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://butko:8Hd4mTmlceS9d9ft@cluster0.i7ddjab.mongodb.net/animal'
);

const Cat = mongoose.model('Cat', { name: String }, 'mycats');

const kitty = new Cat({ name: 'Cat' });
kitty.save().then(() => console.log('мяу'));
