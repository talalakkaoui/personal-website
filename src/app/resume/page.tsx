import Link from "next/link";
import GeoCanvas from "@/components/geo-canvas";

export default function Resume() {
  return (
    <>
      <GeoCanvas />

      <div className="fixed inset-0 z-10 overflow-y-auto px-6 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[960px]">
          <Link
            href="/"
            className="inline-block font-mono text-[0.72rem] tracking-[0.04em] text-fg-dim transition-colors duration-250 hover:text-palette-3"
          >
            &larr; back
          </Link>

          <h1 className="mt-5 font-sans text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-[0.01em]">
            Résumé
          </h1>

          <p className="mt-5 font-sans text-[0.88rem] leading-[1.7] text-fg-dim italic">
            Data scientist and software developer with a foundation in
            computational geometry, applying geometric methods across
            architectural design, engineering simulation, and ML data pipelines.
            Passionate about building robust, geometry-driven software solutions
            at the intersection of data science and geometric computing.
          </p>

          {/* Two-column layout */}
          <div className="mt-10 flex flex-col gap-10 md:flex-row md:gap-12">
            {/* Main content */}
            <div className="flex-1 space-y-9">
              {/* Work Experience */}
              <section>
                <h2 className="mb-5 border-b border-fg-muted/20 pb-2 font-sans text-[0.88rem] font-semibold uppercase tracking-[0.08em]">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  <Entry
                    role="Computational Design Developer"
                    org="Adaptis"
                    location="Toronto, Canada"
                    date="Jun 2024 – Present"
                    bullets={[
                      "Built and deployed automated ML data generation pipelines leveraging computational geometry methods",
                      "Developed a daylighting analysis pipeline that combines geometry generation and ray-tracing simulations",
                      "Bridged data science and software engineering to deliver customer-facing financial tooling, with unit and end-to-end test coverage",
                      "Led the CI/CD and release process for a core company product, managing versioning and deployment pipelines",
                      "Took ownership of and completed projects scoped for Senior Data Scientists",
                    ]}
                  />
                  <Entry
                    role="CAE Research Intern"
                    org="BMW Group"
                    location="Munich, Germany"
                    date="Mar 2023 – Nov 2023"
                    bullets={[
                      "Built a computational geometry pipeline for design optimization of interior part stiffness, integrating FEA simulation and automated post-processing",
                      "Recognized by design and simulation teams as a high-value contribution, resulting in additional budget allocation for further development",
                    ]}
                  />
                  <Entry
                    role="Façade Engineer Intern"
                    org="Octatube Engineering"
                    location="Delft, Netherlands"
                    date="Sep 2022 – Mar 2023"
                    bullets={[
                      "Post-processed computational geometry models for the construction of the Paper Dome pavilion at TU Delft",
                      "Assisted with technical cost estimation for tender offers, analyzing facade assemblies and unit costs",
                    ]}
                  />
                  <Entry
                    role="Architectural Technologist"
                    org="PLP Architecture"
                    location="London, UK"
                    date="Jul 2019 – Jul 2020"
                    bullets={[
                      "Progressed from intern to full-time; designed the entrance atrium of a 50-story Tokyo office building, approved by clients and advanced to planning stage",
                      "Developed parametric computational geometry models using Rhino and Grasshopper for architectural design optimization",
                    ]}
                  />
                  <Entry
                    role="Architectural Designer Intern"
                    org="PLP Architecture"
                    location="London, UK"
                    date="May 2018 – Aug 2018"
                    bullets={[
                      "Contributed to competition entries and spatial planning across London and Delhi projects",
                    ]}
                  />
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="mb-5 border-b border-fg-muted/20 pb-2 font-sans text-[0.88rem] font-semibold uppercase tracking-[0.08em]">
                  Education
                </h2>
                <div className="space-y-6">
                  <Entry
                    role="MSc. Building Technology"
                    org="TU Delft"
                    location="Netherlands"
                    date="Sep 2021 – Nov 2023"
                    extra="GPA: 3.64"
                    bullets={[
                      "Award: Cum Laude",
                      "Thesis: Multidisciplinary Design Optimization for Additive Manufacturing Repair (geometric mesh processing & FEA)",
                    ]}
                  />
                  <Entry
                    role="BA. Architectural Studies"
                    org="University of Toronto"
                    location="Canada"
                    date="Sep 2015 – Apr 2019"
                    bullets={[
                      "Specialized in the Technology Stream — parametric geometry modelling, design informatics, and physical prototyping",
                    ]}
                  />
                </div>
              </section>

              {/* Leadership */}
              <section>
                <h2 className="mb-5 border-b border-fg-muted/20 pb-2 font-sans text-[0.88rem] font-semibold uppercase tracking-[0.08em]">
                  Leadership
                </h2>
                <Entry
                  role="Chair of Company Relations & Finance"
                  org="BouT at TU Delft"
                  date="Apr 2022 – Apr 2023"
                  bullets={[
                    "Managed a team of 15 in organizing a networking event for 7 companies and 60 students",
                    "Managed the association's finances and established company partnerships for collaborations",
                  ]}
                />
              </section>

              {/* Humanitarian Work */}
              <section>
                <h2 className="mb-5 border-b border-fg-muted/20 pb-2 font-sans text-[0.88rem] font-semibold uppercase tracking-[0.08em]">
                  Humanitarian Work
                </h2>
                <Entry
                  role="Disaster Relief Mission"
                  org="Beirut, Lebanon"
                  date="Aug – Sep 2020"
                  bullets={[
                    "Responded to the 2020 Beirut explosion as part of a disaster relief mission",
                    "Reported damages and collaborated with local glass producers to provide façade replacements — successfully restored the facades of 25 houses",
                  ]}
                />
              </section>
            </div>

            {/* Sidebar */}
            <div className="w-full space-y-9 md:w-[260px] md:shrink-0 md:border-l md:border-fg-muted/15 md:pl-8">
              {/* Technical Skills */}
              <section>
                <h2 className="mb-5 border-b border-fg-muted/20 pb-2 font-sans text-[0.88rem] font-semibold uppercase tracking-[0.08em]">
                  Technical Skills
                </h2>
                <div className="space-y-4">
                  <SkillGroup
                    label="Programming Languages"
                    items="Python, C#, JavaScript, TypeScript"
                  />
                  <SkillGroup
                    label="Data Science"
                    items="Pandas, NumPy, Matplotlib, Plotly, Streamlit, MongoDB"
                  />
                  <SkillGroup
                    label="Computational Geometry"
                    items="Shapely, Trimesh, Ladybug-Geometry, Rhinoceros, Grasshopper"
                  />
                  <SkillGroup
                    label="Optimization"
                    items="Genetic Algorithms, SAW"
                  />
                  <SkillGroup
                    label="AI-Assisted Development"
                    items="Claude Code, Cursor"
                  />
                  <SkillGroup
                    label="Software Development"
                    items="Git/GitHub, Docker, FastAPI, Pydantic, GCP, Google Apps Script, Linux, Conventional Commits, Semantic Versioning, GitLab/Bitbucket Pipelines"
                  />
                  <SkillGroup
                    label="Testing"
                    items="Pytest, Vitest, Playwright"
                  />
                  <SkillGroup
                    label="Simulation"
                    items="Finite Element Analysis, Ray Tracing & Acoustic Simulation"
                  />
                  <p className="font-sans text-[0.78rem] text-fg-dim italic">
                    Expanding into: C++, React
                  </p>
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="mb-5 border-b border-fg-muted/20 pb-2 font-sans text-[0.88rem] font-semibold uppercase tracking-[0.08em]">
                  Languages
                </h2>
                <p className="font-sans text-[0.82rem] text-fg-dim">
                  English, French, Arabic
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Entry({
  role,
  org,
  location,
  date,
  extra,
  bullets,
}: {
  role: string;
  org: string;
  location?: string;
  date: string;
  extra?: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="font-sans text-[0.85rem] font-medium">{role}</h3>
        <span className="font-mono text-[0.7rem] text-fg-dim">{date}</span>
      </div>
      <p className="mt-0.5 font-sans text-[0.8rem] text-fg-dim">
        {org}
        {location && <> &middot; {location}</>}
        {extra && <> &middot; {extra}</>}
      </p>
      <ul className="mt-2 space-y-1 pl-4 list-disc marker:text-palette-1/50">
        {bullets.map((b) => (
          <li
            key={b}
            className="pl-1 font-sans text-[0.8rem] leading-[1.6] text-fg-dim"
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string }) {
  return (
    <div>
      <h3 className="font-sans text-[0.8rem] font-medium">{label}</h3>
      <p className="mt-1 font-sans text-[0.78rem] leading-[1.5] text-fg-dim">
        {items}
      </p>
    </div>
  );
}
