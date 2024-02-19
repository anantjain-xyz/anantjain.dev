import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Subscribe to my newsletter for more articles like this.
          </h3>
          <iframe
            src="https://anantjain.substack.com/embed"
            width="480"
            height="150"
          ></iframe>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
