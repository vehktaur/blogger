import mongoose, { InferSchemaType } from 'mongoose';
import { User } from './UserModel';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  models,
  model,
} = mongoose;

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
      type: ObjectId,
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
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  },
);

blogSchema.plugin(mongooseLeanVirtuals);
blogSchema.index({ author: 1 });

const BlogModel = models.Blog || model('Blog', blogSchema);

export type Blog = InferSchemaType<typeof blogSchema> & { _id: string };
export type PopulatedBlog = Omit<Blog, 'author'> & { author: User };
export type BlogDocument = ReturnType<(typeof BlogModel)['hydrate']>;

export default BlogModel;
