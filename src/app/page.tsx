import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { PostList } from "@/app/_components/post-list";
import { getAllPosts } from "../lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const categories = [
    { tagName: "Tech", displayName: "Tech & Startups", slugName: "tech" },
    {
      tagName: "Conference",
      displayName: "Tech Talks",
      slugName: "tech-talks",
    },
    { tagName: "Interview", displayName: "Interviews", slugName: "interviews" },
    {
      tagName: "AI",
      displayName: "Machine Learning & Artificial Intelligence",
      shortDisplayName: "ML & AI",
      slugName: "ai",
    },
    {
      tagName: "UX",
      displayName: "Product Design",
      shortDisplayName: "Product Design",
      slugName: "ux",
    },
    {
      tagName: "Paper Review",
      displayName: "Paper Reviews",
      slugName: "paper-reviews",
    },
    { tagName: "Book List", displayName: "Book Lists", slugName: "book-lists" },
    {
      tagName: "Book Review",
      displayName: "Book Reviews",
      slugName: "book-reviews",
    },
    {
      tagName: "Notes",
      displayName: "Notes",
      slugName: "notes",
    },
    {
      tagName: "Side Project",
      displayName: "Side Projects",
      slugName: "side-projects",
    },
    { tagName: "Fitness", displayName: "Fitness", slugName: "fitness" },
    { tagName: "Art", displayName: "Art", slugName: "art" },
    { tagName: "Misc", displayName: "Miscellaneous", slugName: "misc" },
  ];

  return (
    <main>
      <Container>
        <Intro />
        <PostList title="Latest" posts={allPosts.slice(0, 5)} />
        {categories.map((category) => {
          const posts = allPosts.filter((post) => {
            return post.categories.indexOf(category.tagName) > -1;
          });
          return <PostList title={category.displayName} posts={posts} />;
        })}
      </Container>
    </main>
  );
}
