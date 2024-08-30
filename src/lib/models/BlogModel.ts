import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorImg: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  content: String,
  updatedAt: Date
});

const BlogModel = mongoose.models.Blog || model('Blog', blogSchema);

export default BlogModel;
