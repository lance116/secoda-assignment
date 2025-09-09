// api.ts
// placeholder api functions for now

export interface BlogPost {
  id: string;
  title: string;
  content: string;
}

const DUMMY_POST: BlogPost = {
  id: '12345',
  title: 'sample post',
  content: '# hello world\n\nthis is some sample content with **markdown** support',
};

export async function fetchBlogPost(id: string): Promise<BlogPost> {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // TODO: handle different post ids
  return DUMMY_POST;
}

export async function saveBlogPost(post: BlogPost): Promise<BlogPost> {
  // simulate save operation
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('post saved:', post);
  // error handling needed
  return post;
}
