import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: String,
    name: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: Date,
  content: {
    type: String,
    required: true,
  },
});

const BlogModel = mongoose.models.Blog || model('Blog', blogSchema);

export default BlogModel;
