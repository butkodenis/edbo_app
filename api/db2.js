const mongoose = require('mongoose');

mongoose.connect('mongodb://root:123456@localhost:27017/mydatabase');

const Cat = mongoose.model('Cat', { name: String }, 'mycats');

const kitty = new Cat({ name: 'Cat' });
kitty.save().then(() => console.log('мяу'));
