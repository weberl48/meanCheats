var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
// user schema
var UserSchema = new Schema({
  name: String,
  username: {type: String, required: true, index: {unique :true} } ,
  password: {type: String, required: true, select:false}
});
// using bcrypt to hash the password before it is saved
UserSchema.pre('save', function(next){
  var user = this;

//if user isn't new and password wasn't changed then do not create a hash
  if (!user.isModified('password')) return next();

// making that hash
  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);
    //setting the hashed pw
    user.password = hash
    next();
  });
});

// checking input password with hashed to see if they match
UserSchema.methods.passwordCheck = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

// exporting the model so the rest of the app can use it
module.exports = mongoose.model('User', UserSchema);
