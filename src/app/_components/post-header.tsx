import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";

type Props = {
  title: string;
  date: string;
  categories: string[];
};

export function PostHeader({ title, date, categories }: Props) {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <PostTitle>{title}</PostTitle>
        <div className="mb-2 text-lg font-bold tracking-tighter text-center sm:text-left">
          <DateFormatter dateString={date} />
        </div>
        <div className="mb-12 text-center sm:text-left">
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <span
                key={category}
                className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
              >
                {category}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}
