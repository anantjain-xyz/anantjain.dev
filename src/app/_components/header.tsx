import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link
        href="/"
        className="text-gray-900 hover:text-blue-600 transition-colors duration-200 ease-in-out"
      >
        Anant Jain
      </Link>
    </h2>
  );
};

export default Header;
