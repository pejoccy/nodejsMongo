//Require Mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  surname: {type: String, required: true, max: 150},
  firstname: {type: String, required: true, max: 150},
  gender: {type: String, required: true},
  date_of_birth: {type: Date},
  phone: {type: String, required: true, max: 15},
  email: {type: String, max: 255},
});

// Virtual properties
ContactSchema
  .virtual('name')
  .get(function() {
    return this.surname + ' ' + this.firstname;
  });

ContactSchema
  .virtual('url')
  .get(function() {
    return '/contact/' + this._id + '/update';
  });

module.exports = mongoose.model('Contact', ContactSchema);
