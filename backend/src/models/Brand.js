import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  logoUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Brand', brandSchema);
