const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Server has been connected to database");
    })
    .catch((err) => console.log(err));
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Database disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB Database now connected!");
});

module.exports = {
  connect,
};
