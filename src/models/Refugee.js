import mongoose from 'mongoose';

const refugeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tiktokUsername: { type: String, required: true },
  instagramUsername: { type: String, required: true },
  redNoteUsername: { type: String, required: true },
  snapchatUsername: { type: String, required: true },
  flipUsername: { type: String, required: true },
  linkedinBio: { type: String, required: true },
  knownFor: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Refugee || mongoose.model('Refugee', refugeeSchema);