import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  date: string;
  slug: string;
};

export function PostPreview({ title, date, slug }: Props) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="text-gray-900 hover:text-blue-600 transition-colors duration-200 ease-in-out"
        >
          {title}
        </Link>
      </h3>
      <div className="text-s text-gray-500">
        <DateFormatter dateString={date} />
      </div>
    </div>
  );
}
