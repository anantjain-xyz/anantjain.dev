import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";

type Props = {
  title: string;
  date: string;
};

export function PostHeader({ title, date }: Props) {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <PostTitle>{title}</PostTitle>
        <div className="mb-24 text-lg font-bold tracking-tighter">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
