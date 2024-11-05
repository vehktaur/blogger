import mongoose, { InferSchemaType } from 'mongoose';

const { Schema, models, model } = mongoose;

const blogSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: {
        url: {
          type: String,
          required: true,
        },
        thumbnailUrl: String,
        name: String,
      },
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const BlogModel = models.Blog || model('Blog', blogSchema);

export type Blog = InferSchemaType<typeof blogSchema> & { _id: string };

export default BlogModel;
