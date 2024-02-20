import { Bio } from "./bio";
import { Socials } from "./socials";

export function Intro() {
  return (
    <section className="mt-16 mb-16 md:mb-12">
      <div className="flex flex-col md:flex-row items-center">
        <h1 className="text-5xl font-bold tracking-tighter leading-tight pb-2 md:pr-8 md:pb-0">
          Anant Jain
        </h1>
        <Socials />
      </div>
      <Bio />
    </section>
  );
}
