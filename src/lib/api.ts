// api.ts

export interface BlogPost {
  id: string;
  title: string;
  content: string;
}

const DUMMY_POST: BlogPost = {
  id: '12345',
  title: 'My First Reactive Post',
  content: '# Hello World\n\nThis is my post content. It supports **markdown**!',
};

export async function fetchBlogPost(): Promise<BlogPost> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return DUMMY_POST;
}

export async function saveBlogPost(post: BlogPost): Promise<BlogPost> {
  // Simulate network delay and a successful save
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('Post saved successfully:', post);
  return post;
}
