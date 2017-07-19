var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UserSchema = Schema({
    userName: String,
    password: String,
    hasBook: {type: String, required: false, enum:['Loaned', 'Reserved', 'Returned','None'], default:'None'}

});

// Virtual for this user object's URL
UserSchema
.virtual('url')
.get(function () {
  return '/catalog/user/'+this._id
});
module.exports = mongoose.model('User', UserSchema);