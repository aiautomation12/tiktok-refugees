import mongoose from 'mongoose';

const refugeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  youtubeUsername: { type: String, required: true },
  tiktokUsername: { type: String, required: true },
  instagramUsername: { type: String, required: false },
  redNoteUsername: { type: String, required: false },
  snapchatUsername: { type: String, required: false },
  flipUsername: { type: String, required: false },
  linkedinBio: { type: String, required: false },
  knownFor_1: { type: String, maxlength: 50, required: true },
  knownFor_2: { type: String, maxlength: 50, required: true },
  knownFor_3: { type: String, maxlength: 50, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Refugee || mongoose.model('Refugee', refugeeSchema);