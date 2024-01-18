import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  api_key: {
    type: String,
    unique: true,
  },
})

// user Actions
export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find()

export const getUserByEmail = (email: string) => UserModel.findOne({ email })

export const updateUserApiKey = (id: string, values: Record<string, unknown>) =>
  UserModel.findByIdAndUpdate(id, values)

export const getUserById = (id: string) => UserModel.findById(id)

export const createUser = (values: Record<string, unknown>) =>
  new UserModel(values).save().then((user) => user.toObject())

export const getUserByApiKey = (api_key: string) =>
  UserModel.findOne({ api_key })
