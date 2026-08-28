export interface Experience {
  id: number;
  company: string;
  jobTitle: string;
  duration: string;
  location: string;
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
    company: "Pacific Specialty Insurance Company",
    jobTitle: "React Developer",
    duration: "August 2020 - Present",
    location: "San Francisco, CA",
    descriptions: [
      "Produced fully functional UI applications by writing clean code and working with UI/UX designers by implementing modern front-end development technologies such as React and Redux.",
      "Improved product aesthetics and UI of the high-volume online service, resulting in a 62% increase in users retention, by using CSS elements such as Background, Positioning, Text, Border, Pseudo-elements, Behaviors, etc.",
      "Ensured that the SPA successfully met accessibility and web browser standards, including solving cross-browser compatibility issues.",

      "Implemented Middleware configurations and Redux Promises in the SPA to fetch data from the back end and to consume RESTful services.",

      "Fulfilled responsive web development, including building various web components by using Bootstrap components such as carousel, accordion, drag-and-drop, dropdown menus, navigation bar, alerts, labels, etc.",

      "Guided the consideration and adoption of UI technologies and JavaScript frameworks among emerging UI technologies",

      "Managed version control of the project using software versioning tools such Git.",
    ],
  },
  {
    id: 222,
    company: "Allstate",
    jobTitle: "Front-End Developer",
    duration: "November 2017 - June 2020",
    location: "San Francisco, CA",
    descriptions: [
      "Took responsibilities for building a Customer Relationship Management Application that integrates with the client’s core management systems and component libraries using charts, dashboard, tree, slide view, table-grid, etc.",

      "Developed modern front-end web pages with cutting-edge web development technologies including React, HTML5, CSS3, JavaScript, etc.",

      "Participated in building a robust back-end by constructing RESTful APIs using Express and Node.js.",

      "Designed and created CSS templates that could be reused across the website’s web pages with extensive usage of various CSS elements.",

      "Worked on React components such as state, specs, props, and events to fulfill interactive user experience for the website.",

      "Effectively participated in the Agile/Scrum process including Seasonal Sprints, daily Scrums, and A/B testing to propel the development of the project.",

      "Performed unit testing with Jest and Enzyme.",
    ],
  },
  {
    id: 333,
    company: "Blue Shield of California",
    jobTitle: "Front-End Developer",
    duration: "April 2016 - September 2017",
    location: "San Francisco, CA",
    descriptions: [
      "Worked with advanced web development technologies including HTML5, CSS3, Node.js, React, Express, JavaScript, MongoDB, Bootstrap, Node.js, and Ajax to develop dynamic web pages based on guidelines and requirements.",

      "Handled incident and problem management activities for personal and third-party interfaces designs and successfully coped with various client-side validations.",

      "Developing rich user interface components by taking advantage of JSON, Ajax, JavaScript, CSS3, and HTML5.",

      "Implemented Middleware configurations and Redux Promises in the SPA to fetch data from the back end and to consume RESTful services.",

      "Outlined high-volume, high-scale web front-ends for assets requiring responsive designs and fulfilled and smoothed responsive web performance through Bootstrap and CSS techniques.",

      "Realized basic animation effects using CSS3 and rich user interface components such as tabs and accordions.",

      "Achieved successful version control using Git and performed simple debugging activities using Chrome developer tools.",
    ],
  },
  {
    id: 444,
    company: "Comerica, Inc.",
    jobTitle: "UI Developer",
    duration: "December 2014 - February 2016",
    location: "San Jose, CA",
    descriptions: [
      "Worked with engineering leadership on identifying the best approach and tooling for new features.",

      "Developed the user interfaces and layouts for the web application that matches the requirements of the client using HTML5, CSS3, JavaScript, jQuery, etc.",

      "Participated in regular code reviews with engineering leadership to ensure best practices are followed, and any tech debt is identified for future remediation.",

      "Excellently coordinated with other teammates in project activities and ensure that all project phases are followed and documented properly.",

      "Partner closely with product management, UX designers, and engineering leadership to deliver features.",

      "Translated the mock-ups into hand-written HTML5, CSS3, JavaScript, JQuery, Ajax, XML, and JSON.",

      "Consistently participate in requirements definition and story carding.",
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
