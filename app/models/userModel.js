const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
      email: {type: String, required: true},
      first: {type: String, required: true},
      last: {type: String, required: true},
      mobile: {type: String, required: true},
      type: {type: String, required: true},
      status: {type: String, required: true},
      reject: {
        type: String,
        default: null,
      },
      address: {
        suburb: {type: String, required: true},
        state: {type: String, required: true},
        postcode: {type: Number, required: true},
      },
      profile: {
        resume: {type: String, required: true},
        experience: {type: String, required: true},
        situation: {type: String, required: true},
        license: {type: String, required: true},
        school: {type: String, required: true},
        referral: {type: String, default: ''},
        subjects: [String],
      },
      interview: {
        booking_link: {
          type: String,
          default: null,
        },
        date: {
          type: Date,
          default: null,
        },
        room: {
          type: String,
          default: null,
        },
        pre_answers: {
          type: String,
          default: null,
        },
        notes: {
          type: String,
          default: null,
        },
        outcome: {
          type: String,
          default: null,
        },
      },
      onboarding: {
        status: {
          type: String,
          default: null,
        },
        started: {
          type: String,
          default: null,
        },
        completed: {
          type: String,
          default: null,
        },
        percentage: {
          type: String,
          default: null,
        },
        current_module: {
          type: String,
          default: null,
        },
      },
      reminder: {
        enabled: {
          type: Boolean,
          default: null,
        },
        level: {
          type: Number,
          default: null,
        },
        last_sent: {
          type: String,
          default: null,
        },
      },
    },
    {timestamps: true},
);
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
