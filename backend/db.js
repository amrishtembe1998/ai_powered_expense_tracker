import mongoose from 'mongoose';

export default function mongodbConnect() {
  const uri = 'mongodb://username:password@localhost:27017/';
  mongoose
    .connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
}
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
});

export const User = mongoose.model('User', userSchema);
