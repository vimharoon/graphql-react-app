const bcrypt = require('bcryptjs')
// import user model
const User = require('../../models/user')

const hashPassword = async (password) => {
  try {
    const hasedPassword = await bcrypt.hash(password, 12)
    return hasedPassword
  } catch (error) {
    throw new Error('error in password hashing')
  }
}

const createUser = async (args) => {
  try {
    const user = await User.findOne({ email: args.userInput.email })
    if (user) {
      throw new Error('user with this email already exist')
      return
    }
    const hasedPassword = await hashPassword(args.userInput.password)
    const newUser = new User({
      email: args.userInput.email,
      password: hasedPassword,
    })
    const users = await newUser.save()
    return { ...users._doc, password: null }
  } catch (error) {
    throw error
  }
}
module.exports = {
  createUser,
}
