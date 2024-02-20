import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  title: string;
  posts: Post[];
};

export function PostList({ title, posts }: Props) {
  return (
    <section key={title} className="mb-16">
      <h3 className="text-3xl font-bold mb-8">{title}</h3>
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
        />
      ))}
    </section>
  );
}
