const mongoose = require('mongoose');
mongoose.set('strictQuery',true)
const useSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const Usersmodel = mongoose.model('User', useSchema); 
module.exports = Usersmodel;