export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published?: boolean;
  categories: string[];
};
