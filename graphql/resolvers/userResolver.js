// import user model
const User = require('../../models/user')
const {
  hashPassword,
  generateToken,
  comparePassword,
} = require('../../helpers/_authHelper')

const createUser = async (args) => {
  try {
    const user = await User.findOne({ email: args.userInput.email })
    if (user) {
      throw new Error('user with this email already exist')
      return
    }
    const hasedPassword = await hashPassword(args.userInput.password)
    const newUser = new User({
      firstname: args.userInput.firstname,
      lastname: args.userInput.lastname,
      email: args.userInput.email,
      password: hasedPassword,
    })
    const users = await newUser.save()
    return { ...users._doc, password: null }
  } catch (error) {
    throw error
  }
}

const login = async (args) => {
  try {
    const user = await User.findOne({ email: args.email })
    if (!user) {
      throw new Error('Please verify your credentials and try again')
    }
    const isValidPassword = await comparePassword(args.password, user.password)
    if (!isValidPassword) {
      throw new Error('Please verify your credentials and try again')
    }
    const token = generateToken({ userId: user._id, email: user.email })
    return {
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      token: token,
      tokenExpiration: 1,
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  login,
}
