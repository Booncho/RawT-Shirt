const mongoose = require('mongoose');
module.exports = ()=>{
    const connectDB = mongoose.connect('mongodb+srv://chanakit:Ausry11043123@cluster0.ex9po.mongodb.net/appweb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((client) => {
    console.log('Connected to MongoDB Cloud');
    const db = client.connection.db;
  })
  .catch((error) => console.error('Error connecting to MongoDB Cloud:', error));
}