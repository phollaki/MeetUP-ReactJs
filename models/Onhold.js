const mongoose = require("mongoose");

const OnholdSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
      },
});

module.exports = mongoose.model("Onhold", OnholdSchema);
