import Image from "next/image";

const verificationUrl = "https://vrfy.digital/index.php?key=zmtwrhai";

export default function Certificate() {
  return (
    <section
      className="min-h-screen bg-[var(--bg-band)] px-4 py-[34px] text-[var(--text-inverse)] min-[601px]:px-8 min-[601px]:py-[46px]"
      id="certificate"
    >
      <h1 className="mb-[10px] mt-5 text-center text-[2rem] leading-[1.1] min-[601px]:text-[2.4rem]">
        Certificate
      </h1>
      <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-6 pt-6 min-[901px]:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] min-[901px]:gap-8">
        <div className="max-w-[520px]">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#7facfafa]">
            MCCOMBS SCHOOL OF BUSINESS
          </p>
          <h2 className="mb-[10px] mt-3 text-[1.5rem] font-bold leading-[1.18] min-[601px]:text-[1.95rem]">
            Post Graduate Program in Artificial Intelligence and Machine
            Learning: Business Applications
          </h2>
          <p className="mt-4 text-[0.98rem] font-bold leading-[1.6] text-[rgba(255,255,255,0.86)] min-[601px]:text-base">
            McCombs School of Business
            <br />
            The University of Texas at Austin
            <br />
            Completed September 2025
          </p>
          <p className="mt-5 text-[0.98rem] leading-[1.65] text-[rgba(255,255,255,0.86)] min-[601px]:text-base">
            Completed a postgraduate program focused on artificial intelligence
            and machine learning with an emphasis on real-world business
            applications. The program strengthened my understanding of AI/ML
            concepts and their practical use in software and data-driven
            solutions.
          </p>
          <a
            className="mt-6 inline-flex min-h-10 items-center rounded-md border border-[#1f5f99] bg-[#256da8] px-5 py-2 font-[Arial] text-sm font-bold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.24)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#1f5f99] hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7facfa]"
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify Certificate
          </a>
        </div>
        <div>
          <a
            className="group block rounded-md border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.06)] p-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.2)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7facfa]"
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Verify Post Graduate Program in Artificial Intelligence and Machine Learning certificate"
          >
            <Image
              className="h-auto w-full rounded-sm object-contain transition duration-150 group-hover:brightness-[1.03]"
              src="/images/postgraduateprogram_AI.jpg"
              alt="Certificate for Post Graduate Program in Artificial Intelligence and Machine Learning: Business Applications"
              width={1300}
              height={1004}
              sizes="(max-width: 900px) 100vw, 680px"
              priority={false}
            />
          </a>
          <p className="mb-0 mt-3 text-center text-sm text-[rgba(255,255,255,0.72)]">
            Click certificate to verify
          </p>
        </div>
      </div>
    </section>
  );
}
