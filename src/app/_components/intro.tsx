import { Bio } from "./bio";
import { Socials } from "./socials";
import Image from "next/image";

export function Intro() {
  return (
    <div className="mt-16 mb-16 md:mb-12 max-w-6xl flex flex-row items-start">
      <section className="">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-5xl font-bold tracking-tighter leading-tight pb-2 md:pr-8 md:pb-0">
            Anant Jain
          </h1>
          <Socials />
        </div>
        <Bio />
      </section>
      <Image
        src="/me.jpg"
        className="rounded-full hidden md:block ml-12"
        alt="Anant Jain"
        width={150}
        height={150}
      />
    </div>
  );
}
