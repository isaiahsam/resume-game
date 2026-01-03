// Single source of truth for all resume content

export const PERSONAL_INFO = {
  name: "Isaiah Sam SD. Pascual",
  location: "Greenland Street • Quezon City, 1116",
  email: "isaiah_sam_pascual@dlsu.edu.ph",
  phone: "+ 63 976 407 6762",
};

export const EDUCATION = {
  university: "De La Salle University",
  location: "Manila, Philippines",
  degree: "Computer Science Majoring in Software Technology",
  gpa: "3.072 GPA",
  dates: "October 2021 - December 2025",
};

export const THESIS = {
  title: "GRASP",
  fullTitle: "Machine Learning Authentication System",
  location: "Manila, Philippines",
  dates: "May 2024 – December 2025",
  achievements: [
    "Led the end-to-end engineering lifecycle of a gesture-based authentication system, from requirements definition and solution design to implementation, testing, and validation.",
    "Designed and implemented a machine-learning pipeline using Python, MediaPipe, OpenCV, and Random Forest classifiers, achieving 98% gesture accuracy and 100% spoof rejection through structured user and performance testing.",
  ],
  technologies: ["Python", "MediaPipe", "OpenCV", "Random Forest"],
  metrics: {
    gestureAccuracy: 98,
    spoofRejection: 100,
  },
};

export const WORK_EXPERIENCE = [
  {
    company: "Shopee Philippines",
    location: "Ortigas, Philippines",
    role: "Fraud Detection & Listings Intern",
    dates: "June 2025 – August 2025",
    achievements: [
      "Led the development and release of an offline fraud detection solution by combining machine-learning models and rule-based automation, improving fraud detection rates by 40% and transitioning the system into production operations.",
      "Operationalized large-scale data processing, analyzing 200M+ listings using Python-based pipelines to deliver a 97% detection accuracy, enabling scalable and repeatable fraud identification.",
    ],
    metrics: {
      detectionImprovement: 40,
      listingsProcessed: "200M+",
      detectionAccuracy: 97,
    },
  },
  {
    company: "Asurion Hong Kong Limited ROHQ",
    location: "Taguig, Philippines",
    role: "Software Quality Assurance Intern",
    dates: "May 2024 – August 2024",
    achievements: [
      "Owned the automation strategy for five client applications, designing and implementing test automation frameworks that increased automation coverage from 70% to 95%.",
      "Streamlined the software testing lifecycle by integrating JavaScript and Selenium-based automation into QA processes, improving release reliability and operational efficiency.",
    ],
    metrics: {
      clientApps: 5,
      coverageFrom: 70,
      coverageTo: 95,
    },
  },
];

export const LEADERSHIP_EXPERIENCE = [
  {
    organization: "Computer Studies Government",
    location: "Manila, Philippines",
    role: "Director for Website Development Committee",
    dates: "January 2024 – December 2024",
    achievements: [
      "Led engineering delivery for institutional platforms, managing an 11-member executive team responsible for development, quality, and release of the College of Computer Studies' web systems",
      "Defined the technical roadmap and led the migration of the ONECCS platform from Google Sites to a React and Node.js-based architecture, improving maintainability, deployment control, and long-term scalability.",
    ],
    metrics: {
      teamSize: 11,
    },
  },
  {
    organization: "User Experience Society - Taft",
    location: "Manila, Philippines",
    role: "Web Development Executive",
    dates: "January 2024 – December 2024",
    achievements: [
      "Contributed to architecture and feature development for a university-wide web application using React and JavaScript, balancing user experience requirements with technical constraints.",
      "Helped establish development best practices, supporting separate development and production environments backed by MongoDB.",
    ],
  },
  {
    organization: "AWS Archer's Learning Club",
    location: "Manila, Philippines",
    role: "Director for Logistics Committee",
    dates: "January 2024 – January 2025",
    achievements: [
      "Spearheaded cross-functional delivery teams across multiple initiatives, coordinating timelines, resources, and execution with operational discipline, while improving team capability and process efficiency through workshops focused on logistics optimization and execution excellence.",
    ],
  },
  {
    organization: "CSO: Annual Recruitment Week",
    location: "Manila, Philippines",
    role: "Assistant Team Head for Website Development Committee",
    dates: "September 2023 – October 2023",
    achievements: [
      "Pioneered engineering delivery of a high-traffic platform serving the entire DLSU student body, handling 30,000+ unique page loads with reliability and performance.",
      "Supported full-stack architecture decisions using React, ExpressJS, and MongoDB, with structured dev/prod environments.",
    ],
    metrics: {
      pageLoads: "30,000+",
    },
  },
];

export const PROJECT_EXPERIENCE = [
  {
    project: "NurseLink",
    location: "Manila, Philippines",
    role: "Full Stack Developer",
    dates: "May 2023 – August 2023",
    achievements: [
      "Owned full-stack development of a healthcare professional networking platform, translating business requirements into technical solutions.",
      "Delivered and handed over a production-ready system using React, Node.js, and MongoDB, ensuring client readiness and operational continuity.",
    ],
  },
];

export const SKILLS = {
  "Programming & Platforms": [
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "SQL",
    "MongoDB",
  ],
  "Engineering & Dev Practices": [
    "Test Automation (Selenium)",
    "CI/CD concepts",
    "Dev/Prod Environment Management",
    "Agile Development",
    "PRINCE2",
  ],
  Tools: ["GitHub", "Vercel", "Jupyter Notebook", "TailwindCSS"],
};

// Power-up skills mapping
export const POWER_UPS = [
  { name: "TypeScript", ability: "Double Jump", description: "Type-safe aerial maneuvers" },
  { name: "React", ability: "Component Dash", description: "Reusable movement patterns" },
  { name: "Python", ability: "Script Shield", description: "Automated defense" },
  { name: "MongoDB", ability: "Data Cache", description: "Store checkpoints anywhere" },
  { name: "Selenium", ability: "Test Vision", description: "See hidden paths" },
  { name: "CI/CD", ability: "Auto-Deploy", description: "Instant respawn" },
];

// Level themes and content mapping
export const LEVEL_DATA = [
  {
    id: 1,
    name: "Education Plains",
    theme: "university",
    content: EDUCATION,
    collectible: "Course Credits",
    unlockRequirement: null,
  },
  {
    id: 2,
    name: "Thesis Lab (GRASP)",
    theme: "research",
    content: THESIS,
    collectible: "ML Components",
    unlockRequirement: 1,
  },
  {
    id: 3,
    name: "Shopee City: Fraud Patrol",
    theme: "fraud-detection",
    content: WORK_EXPERIENCE[0],
    collectible: "Detection Badges",
    unlockRequirement: 2,
  },
  {
    id: 4,
    name: "Asurion QA Towers",
    theme: "testing",
    content: WORK_EXPERIENCE[1],
    collectible: "Test Switches",
    unlockRequirement: 3,
  },
  {
    id: 5,
    name: "Leadership Castle",
    theme: "leadership",
    content: LEADERSHIP_EXPERIENCE,
    collectible: "Team Tokens",
    unlockRequirement: 4,
  },
  {
    id: 6,
    name: "NurseLink Network Docks",
    theme: "fullstack",
    content: PROJECT_EXPERIENCE[0],
    collectible: "Feature Crates",
    unlockRequirement: 5,
  },
];

export const BOSS_DATA = {
  name: "The Interview Dragon",
  phases: [
    {
      id: "system-design",
      title: "System Design Challenge",
      description: "Choose the correct architecture blocks",
      questions: [
        {
          question: "How would you design a real-time collaboration system?",
          options: [
            "WebSockets + Redis Pub/Sub + Load Balancer",
            "REST API + Polling + Single Server",
            "FTP + Email Notifications + Cron Jobs",
            "GraphQL Subscriptions Only",
          ],
          correct: 0,
        },
      ],
    },
    {
      id: "debugging",
      title: "Debugging Challenge",
      description: "Spot 3 issues quickly",
      code: `function processUsers(users) {
  for (let i = 0; i <= users.length; i++) {
    if (users[i].age = 18) {
      console.log(user[i].name);
    }
  }
}`,
      issues: [
        "Loop condition should be < not <=",
        "Assignment = instead of comparison ===",
        "Variable name typo: user vs users",
      ],
    },
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Choose the best responses",
      questions: [
        {
          question: "Tell me about a time you faced a technical challenge.",
          options: [
            "At Shopee, I improved fraud detection by 40% by combining ML models with rule-based automation, processing 200M+ listings.",
            "I don't really face challenges, everything is easy for me.",
            "One time my code didn't work but then I fixed it.",
            "I prefer not to talk about past failures.",
          ],
          correct: 0,
        },
      ],
    },
  ],
  rewards: ["Impact", "Scale", "Reliability", "Leadership"],
};
