const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 12)
  } catch (error) {
    throw new Error('error in password hashing')
  }
}

module.hashPassword = hashPassword
