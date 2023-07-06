const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
    mobile: { type: Number, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    reject: {
      type: String,
      default: function () {
        if (this.reject) {
          return reject;
        }
        return null;
      },
    },
    address: {
      suburb: { type: String, required: true },
      state: { type: String, required: true },
      postcode: { type: Number, required: true },
    },
    profile: {
      resume: { type: String, required: true },
      experience: { type: String, required: true },
      situation: { type: String, required: true },
      license: { type: String, required: true },
      school: { type: String, required: true },
      referral: { type: String, default: "" },
      subjects: [String],
    },
    interview: {
      booking_link: {
        type: String,
        default: function () {
          if (this.booking_link) {
            return booking_link;
          }
          return null;
        },
      },
      date: {
        type: Date,
        default: function () {
          if (this.date) {
            return date;
          }
          return "N/A";
        },
      },
      room: {
        type: String,
        default: function () {
          if (this.room) {
            return room;
          }
          return null;
        },
      },
      pre_answers: {
        type: String,
        default: function () {
          if (this.pre_answers) {
            return pre_answers;
          }
          return null;
        },
      },
      notes: {
        type: String,
        default: function () {
          if (this.notes) {
            return notes;
          }
          return null;
        },
      },
      outcome: {
        type: String,
        default: function () {
          if (this.outcome) {
            return outcome;
          }
          return null;
        },
      },
    },
    onboarding: {
      status: {
        type: String,
        default: function () {
          if (this.status) {
            return status;
          }
          return null;
        },
      },
      started: {
        type: String,
        default: function () {
          if (this.started) {
            return started;
          }
          return null;
        },
      },
      completed: {
        type: String,
        default: function () {
          if (this.completed) {
            return completed;
          }
          return null;
        },
      },
      percentage: {
        type: String,
        default: function () {
          if (this.percentage) {
            return percentage;
          }
          return null;
        },
      },
      current_module: {
        type: String,
        default: function () {
          if (this.current_module) {
            return current_module;
          }
          return null;
        },
      },
    },
    reminder: {
      enabled: {
        type: Boolean,
        default: function () {
          if (this.enabled) {
            return enabled;
          }
          return null;
        },
      },
      level: {
        type: Number,
        default: function () {
          if (this.level) {
            return level;
          }
          return null;
        },
      },
      last_sent: {
        type: String,
        default: function () {
          if (this.last_sent) {
            return last_sent;
          }
          return null;
        },
      },
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
