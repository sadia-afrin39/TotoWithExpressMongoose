const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

// instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo",todoSchema).find({ status: "active" });
  },
  findActiveCallback: async function (cb) {
    const data =  await mongoose.model("Todo",todoSchema).find({ status: "active" });
    return cb(data);
  },
};

// static methods
todoSchema.statics = {
  findByJS: function () {
    return this.find({ title: /mongo/i });
  },
};

// query helpers
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") }); // new RegExp()
  },
};
module.exports = todoSchema;
