const User = require('../Models/User');

exports.findUserByEmail = async (email) => {
  try {
    let user = await User.findOne({'email': email});
    return user ? user : null
  } catch (error) {
    throw new Error(error)
  }
};

exports.findUserByUsername = async (username) => {
  try {
    return await User.findOne({'username': username})
  } catch (error) {
    throw new Error(error)
  }
};

exports.findUser = async (param) => { //finding by username or password
  try {
    return await User.findOne({ $or: [ { username: param }, { email: param } ]});
  } catch (error) {
    throw new Error(error)
  }
};