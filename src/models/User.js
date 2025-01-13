import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  googleId: {
    type: String,
    required: true,
    unique: true,
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;