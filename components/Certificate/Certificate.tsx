import Image from "next/image";

const verificationUrl = "https://vrfy.digital/index.php?key=zmtwrhai";

const focusAreas = [
  "Artificial Intelligence",
  "Machine Learning",
  "Applied AI",
  "Data-driven applications",
  "Business applications of AI/ML",
];

export default function Certificate() {
  return (
    <section
      className="bg-[var(--bg-band)] px-4 py-[34px] text-[var(--text-inverse)] min-[601px]:px-8 min-[601px]:py-[42px]"
      id="certificate"
    >
      <h1 className="mb-[10px] mt-5 text-center text-[2rem] leading-[1.1] min-[601px]:text-[2.4rem]">
        Certificate
      </h1>
      <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-8 pt-5 min-[901px]:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-[var(--text-primary)] min-[601px]:p-6">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-[#256da8]">
            McCombs School of Business
          </p>
          <h2 className="mb-[10px] mt-3 text-[1.45rem] font-bold leading-[1.18] min-[601px]:text-[1.85rem]">
            Post Graduate Program in Artificial Intelligence and Machine
            Learning: Business Applications
          </h2>
          <p className="text-[0.98rem] font-bold leading-[1.5] text-[var(--text-secondary)] min-[601px]:text-base">
            McCombs School of Business, The University of Texas at Austin
            <br />
            Completed September 2025
          </p>
          <p className="mt-5 text-[0.98rem] leading-[1.6] min-[601px]:text-base">
            Completed a postgraduate program focused on artificial intelligence
            and machine learning with an emphasis on real-world business
            applications. The program strengthened my understanding of AI/ML
            concepts and their practical use in software and data-driven
            solutions.
          </p>
          <a
            className="mt-5 inline-flex min-h-10 items-center rounded-md border border-[#1f5f99] bg-[#256da8] px-5 py-2 font-[Arial] text-sm font-bold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.24)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#1f5f99] hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7facfa]"
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify Certificate
          </a>
          <div className="mt-7 border-t border-[var(--border-subtle)] pt-5">
            <h3 className="mb-3 mt-0 text-[1.05rem] font-bold leading-[1.2]">
              Focus Areas
            </h3>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {focusAreas.map((area) => (
                <li
                  className="rounded-md border border-[#dcdcdc] bg-[#f9f9f9] bg-[linear-gradient(to_bottom,#f9f9f9_5%,#e9e9e9_100%)] px-3 py-[5px] font-[Arial] text-[13px] font-bold text-[#666666] shadow-[inset_0_1px_0_0_#ffffff] [text-shadow:0_1px_0_#ffffff]"
                  key={area}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          className="group block rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2 shadow-[5px_5px_2px_1px_var(--shadow-color)] transition duration-150 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7facfa]"
          href={verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verify Post Graduate Program in Artificial Intelligence and Machine Learning certificate"
        >
          <Image
            className="h-auto w-full rounded-md border border-[var(--border-color)] object-contain transition duration-150 group-hover:brightness-[1.03]"
            src="/images/postgraduateprogram_AI.jpg"
            alt="Certificate for Post Graduate Program in Artificial Intelligence and Machine Learning: Business Applications"
            width={1300}
            height={1004}
            sizes="(max-width: 900px) 100vw, 500px"
            priority={false}
          />
        </a>
      </div>
    </section>
  );
}
