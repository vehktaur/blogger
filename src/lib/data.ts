export const getAllBlogs = async () => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs`, {
      next: {
        revalidate: 0,
        tags: ['blogs'],
      },
    });
    if (!res.ok) {
      throw new Error('Failed to get blogs');
    }
    const data = await res.json();

    if (!data.blogs) {
      throw new Error('No blogs folks');
    }

    return data.blogs;
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (id: string) => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs/${id}`, {
      next: { revalidate: 0, tags: [`blog-${id}`] },
    });
    if (!res.ok) {
      throw new Error('Failed to get blogs');
    }
    const data = await res.json();
    return data.blog;
  } catch (error) {
    console.log(error);
  }
};
