import Image from "next/image";
import Link from "next/link";
import GeoCanvas from "@/components/geo-canvas";
import profilePic from "@/app/icon.png";

export default function Bio() {
  return (
    <>
      <GeoCanvas />

      <div className="fixed inset-0 z-10 overflow-y-auto px-6 py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-[960px] flex-col-reverse items-center gap-10 md:flex-row md:items-start md:gap-14">
          <div className="flex-1 space-y-5">
            <Link
              href="/"
              className="inline-block font-mono text-[0.72rem] tracking-[0.04em] text-fg-dim transition-colors duration-250 hover:text-palette-3"
            >
              &larr; back
            </Link>

            <h1 className="font-sans text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-[0.01em]">
              Bio
            </h1>

            <div className="space-y-4 font-sans text-[0.88rem] leading-[1.7] text-fg-dim">
              <p>
                Talal is a computational designer and software developer whose career has 
                traced a path from architecture studios to engineering simulation labs
                to software teams — united by a single thread: using
                computational geometry to make design decisions smarter and more
                rigorous.
              </p>
              <p>
                Talal pursued his bachelor&apos;s degree in architecture at the
                University of Toronto (2015–2019), where he was introduced to
                computational design and representation. He then moved to London
                to join PLP Architecture, where he was promoted from intern to
                architectural technologist while working on international
                projects, including the entrance atrium of a 50-story multi-use
                building in Tokyo, Japan.
              </p>
              <p>
                In the summer of 2020, Talal responded to the humanitarian crisis in Beirut following the
                August 4th harbor explosion, helping restore the facades of 25
                houses and allowing displaced families to return to their homes.
              </p>
              <p>
                Driven to deepen his technical foundations, Talal moved to the
                Netherlands to pursue his Master of Science at Delft University
                of Technology (2021–2023), focusing on design informatics and
                sustainability. He served as chair of company relations and
                finance of the BouT student association, collaborated with
                Octatube Engineering, and competed in intramural basketball.
                During his final year, he moved to Munich to partner with BMW
                Group on his master&apos;s thesis, &ldquo;Multidisciplinary
                Design Optimization for Additive Manufacturing
                Repair,&rdquo; combining computational geometry and finite
                element analysis to optimize structural performance. He graduated
                Cum Laude.
              </p>
              <p>
                Since returning to Toronto in 2024, Talal has worked as a
                Computational Design Developer at Adaptis Technologies, where he
                built automated ML data generation pipelines leveraging
                computational geometry methods, developed simulation-driven
                analysis tools combining geometry generation with ray-tracing,
                and delivered customer-facing software with full test coverage
                and CI/CD ownership. This experience solidified his focus on
                geometry-driven software — bridging parametric design,
                engineering simulation, and software development to build
                robust, impactful products.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Image
              src={profilePic}
              alt="Talal Akkaoui"
              width={280}
              height={280}
              preload
              className="rounded-full border-2 border-fg-muted/30 object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
