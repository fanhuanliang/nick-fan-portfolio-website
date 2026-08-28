export interface Experience {
  id: number;
  company: string;
  jobTitle: string;
  duration: string;
  location: string;
  descriptions: string[];
  keyProjects?: ExperienceProject[];
}

export interface ExperienceProject {
  title: string;
  descriptions: string[];
}

export interface Project {
  id: number;
  imageLink: string;
  appName: string;
  description: string;
  techStacks: string[];
  github: string;
  youTubeLink: string;
}

export interface TechLogo {
  id: number;
  link: string;
  label: string;
}

export const experienceData: Experience[] = [
  {
    id: 111,
    company: "Dell Technologies",
    jobTitle: "Senior Software Engineer",
    duration: "September 2021 - Present",
    location: "San Francisco, CA",
    descriptions: [
      "Develop and maintain enterprise web applications using React, TypeScript, C#, .NET, SQL, and REST APIs across front-end and back-end systems.",
      "Design and integrate REST APIs connecting multiple enterprise applications and data sources.",
      "Diagnose and resolve application, API, database, authentication, and deployment issues across development and production environments.",
      "Collaborate with product owners, architects, QA engineers, and developers to refine requirements, review designs, and deliver production releases.",
      "Contribute to CI/CD and deployment workflows in GitLab, including automated build and security-scanning pipelines.",
    ],
    keyProjects: [
      {
        title: "Enterprise Backend Modernization",
        descriptions: [
          "Migrated a legacy F# backend to C#/.NET, restructuring functionality into independently maintained services.",
          "Implemented and enhanced REST APIs and business logic supporting enterprise application workflows.",
          "Contributed to CI/CD, code reviews, architectural discussions, troubleshooting, and performance improvements.",
        ],
      },
      {
        title: "Legacy Application Migration to React and Microservices",
        descriptions: [
          "Contributed to migrating a legacy Angular/SharePoint application to React microfrontends and .NET services.",
          "Implemented functionality across React UI, .NET APIs, and database layers while maintaining continuity with existing enterprise workflows.",
          "Resolved API and data-model integration challenges across dependent systems during the migration.",
          "Built reusable UI components and application patterns to improve maintainability and support continued modernization.",
        ],
      },
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: 1,
    imageLink: "/images/payment-project.png",
    appName: "Payment-System",
    description:
      "A full Stack MERN Application to mimic a 'Funds Transfer' like Venmo, by using JWT for authentication and authorization.",
    techStacks: [
      "JavaScript",
      "React",
      "React Router",
      "Express",
      "Redux",
      "MongoDB Atlas",
      "Styled Component",
      "Node.js",
      "JWT",
    ],
    github: "https://github.com/fanhuanliang/Payment-System",
    youTubeLink: "https://www.youtube.com/watch?v=g4Gut7ZElOE",
  },
  {
    id: 2,
    imageLink: "/images/movie-search-project.png",
    appName: "Movie Search App",
    description:
      "Movie Search Application is a responsive React App using api from OMDb API.",
    techStacks: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux",
      "Styled Component",
    ],
    github: "https://github.com/fanhuanliang/movie-search-app",
    youTubeLink: "https://www.youtube.com/watch?v=BiPkyorwQ24",
  },
  {
    id: 3,
    imageLink: "/images/lego-project.png",
    appName: "LEGO-Main-Product-Review",
    description:
      "My first fullstack application with small team. I am responsible for the review component.",
    techStacks: ["JavaScript", "React", "Node.js", "Express", "sass", "mysql"],
    github: "https://github.com/fanhuanliang/Main-Product-Review",
    youTubeLink: "https://www.youtube.com/watch?v=OM_BobTBpiw",
  },
  {
    id: 4,
    imageLink: "/images/calculator.png",
    appName: "Mini-App-Calculator",
    description: "Building a mini-app-calculator for fun.",
    techStacks: ["React", "TypeScript"],
    github: "https://github.com/fanhuanliang/mini-app-calculator",
    youTubeLink: "https://www.youtube.com/watch?v=fSRJMxJAP3c",
  },
];

export const logo: TechLogo[] = [
  { id: 1, link: "/images/html-5.svg", label: "HTML5" },
  { id: 2, link: "/images/css-logo.svg", label: "CSS3" },
  { id: 3, link: "/images/js-logo.svg", label: "JavaScript" },
  { id: 4, link: "/images/typescript.svg", label: "TypeScript" },
  { id: 5, link: "/images/react.svg", label: "React" },
  { id: 6, link: "/images/nextjs.svg", label: "Next.js" },
  { id: 7, link: "/images/nodejs.svg", label: "Node.js" },
  { id: 8, link: "/images/express.svg", label: "Express" },
  { id: 9, link: "/images/mysql.svg", label: "MySQL" },
  { id: 10, link: "/images/mongodb.svg", label: "MongoDB" },
  { id: 11, link: "/images/git.svg", label: "Git" },
  { id: 12, link: "/images/aws.svg", label: "AWS" },
];
