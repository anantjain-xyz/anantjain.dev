import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { PostList } from "@/app/_components/post-list";
import { getAllPosts } from "../lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <Intro />
        {allPosts.length > 0 && <PostList posts={allPosts} />}
      </Container>
    </main>
  );
}
