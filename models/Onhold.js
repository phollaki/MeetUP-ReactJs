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
// User can only join 1/1 event
OnholdSchema.index({ event: 1, user: 1 }, { unique: true });
module.exports = mongoose.model("Onhold", OnholdSchema);
