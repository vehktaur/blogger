import { InferSchemaType, model, models, Schema } from 'mongoose';
import { User } from './users';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  },
);

blogSchema.plugin(mongooseLeanVirtuals);
blogSchema.index({ author: 1 });

const Blogs = models.Blog || model('Blog', blogSchema);

//Export blog document and object types
export type Blog = InferSchemaType<typeof blogSchema> & {
  image: InferSchemaType<typeof blogSchema>['image'] & { _id?: string };
  _id: string;
};
export type PopulatedBlog = Omit<Blog, 'author'> & { author: User };
export type BlogDocument = ReturnType<(typeof Blogs)['hydrate']>;

export default Blogs;
