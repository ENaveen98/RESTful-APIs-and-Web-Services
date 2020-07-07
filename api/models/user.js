const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //   Unique set to True ensures some Optimization given that we only store unique values
  // Note: Unique does not mean it will automatically take care. We need to ensure unique values
  email: {
    type: String,
    required: true,
    // unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
