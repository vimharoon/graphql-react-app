const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 12)
  } catch (error) {
    throw new Error('error in password hashing')
  }
}

const comparePassword = async (inputPassword, userPassword) => {
  try {
    return await bcrypt.compare(inputPassword, userPassword)
  } catch (error) {
    throw error
  }
}

const generateToken = (args) => {
  return jwt.sign(args, 'secretkeypleasemakesurtomodifyit', {
    expiresIn: '1h',
  })
}

module.exports = {
  hashPassword,
  generateToken,
  comparePassword,
}
