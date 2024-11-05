export const getAllBlogs = async () => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs`, {
      next: { revalidate: 60, tags: ['blogs'] },
    });
    if (!res.ok) {
      throw new Error('Failed to get blogs');
    }
    const data = await res.json();

    if (!data.blogs || !Array.isArray(data.blogs)) {
      throw new Error('Unexpected response format');
    }

    return data.blogs;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getBlog = async (id: string) => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs/${id}`, {
      next: { revalidate: 60, tags: [`blog-${id}`] },
    });
    if (!res.ok) {
      throw new Error('Failed to get blogs');
    }
    const data = await res.json();

    if (!data.blog) {
      throw new Error('Unexpected response format');
    }

    return data.blog;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) throw new Error(error.message);
  }
};
