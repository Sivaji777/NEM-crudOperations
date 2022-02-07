const mongoose = require("mongoose");
const User = mongoose.model('User', new mongoose.Schema({
                    name:{
                      type: String,
                      required: true,
                    },
                    age:{
                      type: String,
                      required: true,
                    }
              }))

exports.User = User;
