import aiHackathon from "../assets/hackathons/ai-hackathon.jpg";
import webDevelopment from "../assets/hackathons/web-development.jpg";
import cybersecurity from "../assets/hackathons/cybersecurity.jpg";
import greenTechnology from "../assets/hackathons/green-technology.jpg";
import fintech from "../assets/hackathons/fintech.jpg";
import appDevelopment from "../assets/hackathons/app-development.jpg";

export const hackathons = [
  // ============================================================
  // 1. AI INNOVATION HACKATHON
  // ============================================================
  {
    id: 1,
    title: "AI Innovation Hackathon 2026",
    organizer: "Tech Innovators",

    description:
      "Build innovative AI-powered solutions for real-world problems.",

    category: "Artificial Intelligence",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹2,00,000",
    participants: 250,
    maxParticipants: 500,

    deadline: "15 September 2026",
    duration: "48 Hours",
    startDate: "20 September 2026",
    endDate: "22 September 2026",

    image: aiHackathon,
    featured: true,

    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "React",
      "Python",
    ],

    overview:
      "The AI Innovation Hackathon 2026 challenges participants to build innovative artificial intelligence solutions that solve real-world problems. Participants can use machine learning, generative AI, data science, and modern web technologies to create impactful solutions.",

    eligibility:
      "Students, developers, AI enthusiasts, and technology professionals can participate in this hackathon.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Innovation and originality",
      "Technical implementation",
      "Real-world impact",
      "User experience and design",
      "Presentation and demonstration",
    ],

    requirements: [
      "Students and developers can participate.",
      "Team size should be between 1 and 4 members.",
      "Participants should submit a working project.",
      "The project should use AI or machine learning in a meaningful way.",
      "Participants must provide project documentation.",
    ],

    rules: [
      "The project must be developed during the hackathon.",
      "Participants must follow the code of conduct.",
      "All submitted work must be original.",
      "Participants must not submit previously developed projects.",
      "All team members must contribute to the project.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "15 September 2026",
      },
      {
        title: "Hackathon Starts",
        date: "20 September 2026",
      },
      {
        title: "Project Submission",
        date: "22 September 2026",
      },
      {
        title: "Winner Announcement",
        date: "25 September 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,00,000",
      },
      {
        position: "2nd Prize",
        amount: "₹60,000",
      },
      {
        position: "3rd Prize",
        amount: "₹40,000",
      },
    ],
  },

  // ============================================================
  // 2. WEB DEVELOPMENT
  // ============================================================
  {
    id: 2,
    title: "Web Development Challenge 2026",
    organizer: "Code Masters",

    description:
      "Create modern and scalable web applications using the latest technologies.",

    category: "Web Development",
    mode: "Online",
    difficulty: "Beginner",
    location: "Online",

    prize: "₹1,00,000",
    participants: 180,
    maxParticipants: 400,

    deadline: "25 September 2026",
    duration: "36 Hours",
    startDate: "28 September 2026",
    endDate: "30 September 2026",

    image: webDevelopment,
    featured: false,

    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
    ],

    overview:
      "The Web Development Challenge 2026 is designed for developers who want to build modern, responsive, and scalable web applications. Participants can demonstrate their frontend, backend, database, and UI/UX development skills.",

    eligibility:
      "The hackathon is open to students, beginners, and developers interested in web development.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Website functionality",
      "UI/UX design",
      "Technical implementation",
      "Performance and responsiveness",
      "Innovation",
    ],

    requirements: [
      "Open to students and beginners.",
      "Individual or team participation is allowed.",
      "Participants must submit a functional website.",
      "The website should be responsive.",
      "Participants must provide a project description.",
    ],

    rules: [
      "Use of open-source libraries is allowed.",
      "The submitted project must be original.",
      "Participants must submit before the deadline.",
      "Projects must follow basic web accessibility practices.",
      "Plagiarized projects will be disqualified.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "25 September 2026",
      },
      {
        title: "Hackathon Starts",
        date: "28 September 2026",
      },
      {
        title: "Project Submission",
        date: "30 September 2026",
      },
      {
        title: "Winner Announcement",
        date: "3 October 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹50,000",
      },
      {
        position: "2nd Prize",
        amount: "₹30,000",
      },
      {
        position: "3rd Prize",
        amount: "₹20,000",
      },
    ],
  },

  // ============================================================
  // 3. CYBER SECURITY
  // ============================================================
  {
    id: 3,
    title: "Cyber Security Hackathon",
    organizer: "SecureTech",

    description:
      "Develop innovative solutions to solve modern cybersecurity challenges.",

    category: "Cybersecurity",
    mode: "Offline",
    difficulty: "Advanced",
    location: "Nagpur, India",

    prize: "₹1,50,000",
    participants: 120,
    maxParticipants: 300,

    deadline: "5 October 2026",
    duration: "48 Hours",
    startDate: "10 October 2026",
    endDate: "12 October 2026",

    image: cybersecurity,
    featured: false,

    skills: [
      "Cybersecurity",
      "Networking",
      "Ethical Hacking",
      "Linux",
    ],

    overview:
      "The Cyber Security Hackathon challenges participants to develop innovative and practical solutions for modern cybersecurity problems. Participants can work on network security, threat detection, secure applications, and security automation.",

    eligibility:
      "The hackathon is open to students, cybersecurity enthusiasts, developers, and security professionals with basic cybersecurity knowledge.",

    teamSize: "2 - 4 members",

    judgingCriteria: [
      "Security effectiveness",
      "Technical implementation",
      "Innovation",
      "Problem-solving ability",
      "Presentation",
    ],

    requirements: [
      "Participants should have basic cybersecurity knowledge.",
      "Team size should be between 2 and 4 members.",
      "Participants must bring their own laptop.",
      "Projects should address a cybersecurity problem.",
      "Participants must explain their security approach.",
    ],

    rules: [
      "No malicious activity outside the provided environment.",
      "All security testing must follow the event rules.",
      "Projects must be submitted before the deadline.",
      "Participants must not attack external systems.",
      "All submitted work must be original.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "5 October 2026",
      },
      {
        title: "Hackathon Starts",
        date: "10 October 2026",
      },
      {
        title: "Project Submission",
        date: "12 October 2026",
      },
      {
        title: "Winner Announcement",
        date: "15 October 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹75,000",
      },
      {
        position: "2nd Prize",
        amount: "₹45,000",
      },
      {
        position: "3rd Prize",
        amount: "₹30,000",
      },
    ],
  },

  // ============================================================
  // 4. GREEN TECHNOLOGY
  // ============================================================
  {
    id: 4,
    title: "Green Technology Hackathon",
    organizer: "EcoTech",

    description:
      "Build technology solutions that help create a sustainable future.",

    category: "Technology",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹75,000",
    participants: 95,
    maxParticipants: 250,

    deadline: "12 October 2026",
    duration: "24 Hours",
    startDate: "15 October 2026",
    endDate: "16 October 2026",

    image: greenTechnology,
    featured: false,

    skills: [
      "Web Development",
      "IoT",
      "Cloud",
      "Data Analytics",
    ],

    overview:
      "The Green Technology Hackathon focuses on developing technology-based solutions for environmental and sustainability challenges. Participants can work on renewable energy, waste management, smart cities, environmental monitoring, and other sustainability-focused ideas.",

    eligibility:
      "The hackathon is open to students, developers, professionals, and technology enthusiasts interested in sustainability.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Environmental impact",
      "Innovation",
      "Technical feasibility",
      "Scalability",
      "User experience",
    ],

    requirements: [
      "Open to students and professionals.",
      "Projects should focus on sustainability.",
      "Individual or team participation is allowed.",
      "Projects should address a real environmental problem.",
      "Participants must submit project documentation.",
    ],

    rules: [
      "Projects must address a real sustainability problem.",
      "Participants must submit project documentation.",
      "All work must be original.",
      "Participants must explain the environmental impact.",
      "Projects should be technically feasible.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "12 October 2026",
      },
      {
        title: "Hackathon Starts",
        date: "15 October 2026",
      },
      {
        title: "Project Submission",
        date: "16 October 2026",
      },
      {
        title: "Winner Announcement",
        date: "19 October 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹40,000",
      },
      {
        position: "2nd Prize",
        amount: "₹20,000",
      },
      {
        position: "3rd Prize",
        amount: "₹15,000",
      },
    ],
  },

  // ============================================================
  // 5. FINTECH
  // ============================================================
  {
    id: 5,
    title: "FinTech Innovation Challenge",
    organizer: "Future Finance",

    description:
      "Develop innovative financial technology solutions for modern users.",

    category: "FinTech",
    mode: "Online",
    difficulty: "Advanced",
    location: "Online",

    prize: "₹2,50,000",
    participants: 210,
    maxParticipants: 500,

    deadline: "20 October 2026",
    duration: "48 Hours",
    startDate: "23 October 2026",
    endDate: "25 October 2026",

    image: fintech,
    featured: false,

    skills: [
      "FinTech",
      "Blockchain",
      "React",
      "Database",
    ],

    overview:
      "The FinTech Innovation Challenge invites participants to build innovative financial technology solutions that improve financial services, payments, digital banking, financial management, and user experiences.",

    eligibility:
      "The hackathon is open to students, developers, finance enthusiasts, and technology professionals.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Innovation",
      "Financial problem-solving",
      "Technical implementation",
      "Security",
      "User experience",
    ],

    requirements: [
      "Participants should have basic finance knowledge.",
      "Teams can contain up to 4 members.",
      "A working prototype is required.",
      "The solution should solve a financial problem.",
      "Participants must explain their technical approach.",
    ],

    rules: [
      "Projects should solve a financial problem.",
      "Participants must explain their technical approach.",
      "All submitted work must be original.",
      "Projects must follow applicable event guidelines.",
      "Participants must submit before the deadline.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "20 October 2026",
      },
      {
        title: "Hackathon Starts",
        date: "23 October 2026",
      },
      {
        title: "Project Submission",
        date: "25 October 2026",
      },
      {
        title: "Winner Announcement",
        date: "28 October 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,25,000",
      },
      {
        position: "2nd Prize",
        amount: "₹75,000",
      },
      {
        position: "3rd Prize",
        amount: "₹50,000",
      },
    ],
  },

  // ============================================================
  // 6. STUDENT APP DEVELOPMENT
  // ============================================================
  {
    id: 6,
    title: "Student App Development Hackathon",
    organizer: "Student Developers",

    description:
      "Create useful mobile or web applications designed for students.",

    category: "App Development",
    mode: "Offline",
    difficulty: "Beginner",
    location: "Amravati, India",

    prize: "₹50,000",
    participants: 75,
    maxParticipants: 200,

    deadline: "30 October 2026",
    duration: "24 Hours",
    startDate: "2 November 2026",
    endDate: "3 November 2026",

    image: appDevelopment,
    featured: false,

    skills: [
      "React",
      "JavaScript",
      "Mobile Development",
      "UI/UX",
    ],

    overview:
      "The Student App Development Hackathon gives students an opportunity to build useful mobile or web applications that solve real problems faced by students in their academic and daily lives.",

    eligibility:
      "The hackathon is open to college students interested in developing useful applications.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Usefulness of the application",
      "Innovation",
      "Technical implementation",
      "UI/UX design",
      "Presentation",
    ],

    requirements: [
      "Open to college students.",
      "Team size should be between 1 and 4 members.",
      "Participants should develop a useful student-focused application.",
      "The application should solve a real student problem.",
      "Participants must present their application.",
    ],

    rules: [
      "The application should solve a real student problem.",
      "Participants must present their application.",
      "Projects must be submitted on time.",
      "All submitted work must be original.",
      "Participants must follow the event guidelines.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "30 October 2026",
      },
      {
        title: "Hackathon Starts",
        date: "2 November 2026",
      },
      {
        title: "Project Submission",
        date: "3 November 2026",
      },
      {
        title: "Winner Announcement",
        date: "6 November 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹25,000",
      },
      {
        position: "2nd Prize",
        amount: "₹15,000",
      },
      {
        position: "3rd Prize",
        amount: "₹10,000",
      },
    ],
  },

  // ============================================================
  // 7. GREENTECH INNOVATION
  // ============================================================
  {
    id: 7,
    title: "GreenTech Innovation Challenge",
    organizer: "Green Future Labs",

    description:
      "Develop innovative technology solutions for climate and environmental challenges.",

    category: "Technology",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹1,25,000",
    participants: 140,
    maxParticipants: 350,

    deadline: "8 November 2026",
    duration: "36 Hours",
    startDate: "12 November 2026",
    endDate: "13 November 2026",

    image: greenTechnology,
    featured: true,

    skills: [
      "IoT",
      "Data Analytics",
      "Cloud",
      "Web Development",
    ],

    overview:
      "Participants will develop technology solutions that address climate change, pollution, renewable energy, waste management, and environmental monitoring.",

    eligibility:
      "Students, developers, researchers, and technology enthusiasts can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Environmental impact",
      "Innovation",
      "Technical feasibility",
      "Scalability",
      "Presentation",
    ],

    requirements: [
      "Solution must address an environmental problem.",
      "Working prototype is recommended.",
      "Teams can have up to 4 members.",
      "Project documentation is required.",
      "Participants must demonstrate the solution.",
    ],

    rules: [
      "Projects must be original.",
      "Participants must follow event guidelines.",
      "Environmental impact should be clearly explained.",
      "Projects must be submitted before the deadline.",
      "All team members should contribute.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "8 November 2026",
      },
      {
        title: "Hackathon Starts",
        date: "12 November 2026",
      },
      {
        title: "Project Submission",
        date: "13 November 2026",
      },
      {
        title: "Winner Announcement",
        date: "16 November 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹60,000",
      },
      {
        position: "2nd Prize",
        amount: "₹40,000",
      },
      {
        position: "3rd Prize",
        amount: "₹25,000",
      },
    ],
  },

  // ============================================================
  // 8. CODESTORM INDIA
  // ============================================================
  {
    id: 8,
    title: "CodeStorm India 2026",
    organizer: "CodeStorm Community",

    description:
      "Build creative software solutions and compete with developers from across India.",

    category: "Web Development",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹1,75,000",
    participants: 320,
    maxParticipants: 600,

    deadline: "15 November 2026",
    duration: "48 Hours",
    startDate: "20 November 2026",
    endDate: "22 November 2026",

    image: webDevelopment,
    featured: true,

    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
    ],

    overview:
      "CodeStorm India 2026 is a developer-focused hackathon where participants can build innovative software products using modern web technologies.",

    eligibility:
      "Students, developers, freelancers, and technology enthusiasts across India can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Innovation",
      "Functionality",
      "Technical quality",
      "UI/UX",
      "Scalability",
    ],

    requirements: [
      "Participants must submit a working software project.",
      "Projects should demonstrate technical implementation.",
      "Teams can have up to 4 members.",
      "Source code should be available for evaluation.",
      "Participants must provide documentation.",
    ],

    rules: [
      "All projects must be original.",
      "Existing open-source libraries are allowed.",
      "Participants must submit within the given time.",
      "Teams must follow the code of conduct.",
      "Plagiarism is not allowed.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "15 November 2026",
      },
      {
        title: "Hackathon Starts",
        date: "20 November 2026",
      },
      {
        title: "Project Submission",
        date: "22 November 2026",
      },
      {
        title: "Winner Announcement",
        date: "25 November 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹90,000",
      },
      {
        position: "2nd Prize",
        amount: "₹55,000",
      },
      {
        position: "3rd Prize",
        amount: "₹30,000",
      },
    ],
  },

  // ============================================================
  // 9. DATA SCIENCE MASTERS
  // ============================================================
  {
    id: 9,
    title: "Data Science Masters Hackathon",
    organizer: "DataTech Labs",

    description:
      "Use data science and machine learning to solve complex real-world problems.",

    category: "Artificial Intelligence",
    mode: "Online",
    difficulty: "Advanced",
    location: "Online",

    prize: "₹2,00,000",
    participants: 200,
    maxParticipants: 450,

    deadline: "22 November 2026",
    duration: "48 Hours",
    startDate: "27 November 2026",
    endDate: "29 November 2026",

    image: aiHackathon,
    featured: false,

    skills: [
      "Python",
      "Machine Learning",
      "Data Science",
      "Data Analytics",
    ],

    overview:
      "Participants will analyze datasets, build machine learning models, discover useful insights, and create data-driven solutions for real-world problems.",

    eligibility:
      "Students, data scientists, developers, and machine learning enthusiasts can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Model accuracy",
      "Data analysis",
      "Innovation",
      "Business impact",
      "Presentation",
    ],

    requirements: [
      "Participants should have basic data science knowledge.",
      "A working data solution must be submitted.",
      "Teams can have up to 4 members.",
      "Participants must explain their methodology.",
      "Project documentation is required.",
    ],

    rules: [
      "Participants must use the provided datasets where specified.",
      "Projects must be original.",
      "Data must be handled responsibly.",
      "Participants must submit before the deadline.",
      "All results must be properly explained.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "22 November 2026",
      },
      {
        title: "Hackathon Starts",
        date: "27 November 2026",
      },
      {
        title: "Project Submission",
        date: "29 November 2026",
      },
      {
        title: "Winner Announcement",
        date: "2 December 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,00,000",
      },
      {
        position: "2nd Prize",
        amount: "₹60,000",
      },
      {
        position: "3rd Prize",
        amount: "₹40,000",
      },
    ],
  },

  // ============================================================
  // 10. FINTECH FUTURE
  // ============================================================
  {
    id: 10,
    title: "FinTech Future Hackathon",
    organizer: "Digital Finance Hub",

    description:
      "Build the next generation of digital financial products and services.",

    category: "FinTech",
    mode: "Online",
    difficulty: "Advanced",
    location: "Online",

    prize: "₹2,50,000",
    participants: 280,
    maxParticipants: 500,

    deadline: "30 November 2026",
    duration: "48 Hours",
    startDate: "4 December 2026",
    endDate: "6 December 2026",

    image: fintech,
    featured: true,

    skills: [
      "FinTech",
      "React",
      "Blockchain",
      "Database",
    ],

    overview:
      "The FinTech Future Hackathon focuses on building innovative solutions for digital payments, banking, financial planning, fraud detection, and financial inclusion.",

    eligibility:
      "Students, developers, finance enthusiasts, and technology professionals can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Innovation",
      "Financial impact",
      "Security",
      "Technical implementation",
      "User experience",
    ],

    requirements: [
      "Project must solve a financial problem.",
      "A functional prototype is required.",
      "Teams can have up to 4 members.",
      "Security considerations must be explained.",
      "Participants must provide project documentation.",
    ],

    rules: [
      "All projects must be original.",
      "Participants must follow financial technology guidelines.",
      "Security vulnerabilities should be addressed.",
      "Projects must be submitted before the deadline.",
      "Participants must demonstrate their solution.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "30 November 2026",
      },
      {
        title: "Hackathon Starts",
        date: "4 December 2026",
      },
      {
        title: "Project Submission",
        date: "6 December 2026",
      },
      {
        title: "Winner Announcement",
        date: "9 December 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,25,000",
      },
      {
        position: "2nd Prize",
        amount: "₹75,000",
      },
      {
        position: "3rd Prize",
        amount: "₹50,000",
      },
    ],
  },

  // ============================================================
  // 11. WOMEN IN TECH
  // ============================================================
  {
    id: 11,
    title: "Women in Tech Hackathon",
    organizer: "Women Tech Network",

    description:
      "Empower innovation by building technology solutions for meaningful social impact.",

    category: "Technology",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹1,50,000",
    participants: 220,
    maxParticipants: 400,

    deadline: "10 December 2026",
    duration: "36 Hours",
    startDate: "14 December 2026",
    endDate: "15 December 2026",

    image: webDevelopment,
    featured: false,

    skills: [
      "Web Development",
      "JavaScript",
      "React",
      "UI/UX",
    ],

    overview:
      "This hackathon encourages innovative technology solutions that solve problems related to education, safety, healthcare, financial inclusion, and social empowerment.",

    eligibility:
      "Women students, developers, designers, and technology professionals are invited to participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Social impact",
      "Innovation",
      "Technical implementation",
      "User experience",
      "Presentation",
    ],

    requirements: [
      "Project should solve a meaningful problem.",
      "Teams can contain up to 4 members.",
      "A functional prototype is recommended.",
      "Participants must explain the social impact.",
      "Project documentation is required.",
    ],

    rules: [
      "All submitted work must be original.",
      "Participants must follow the code of conduct.",
      "Projects must be submitted before the deadline.",
      "All team members should contribute.",
      "Participants must present their solution.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "10 December 2026",
      },
      {
        title: "Hackathon Starts",
        date: "14 December 2026",
      },
      {
        title: "Project Submission",
        date: "15 December 2026",
      },
      {
        title: "Winner Announcement",
        date: "18 December 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹75,000",
      },
      {
        position: "2nd Prize",
        amount: "₹45,000",
      },
      {
        position: "3rd Prize",
        amount: "₹30,000",
      },
    ],
  },

  // ============================================================
  // 12. DEVOPS & CLOUD
  // ============================================================
  {
    id: 12,
    title: "DevOps & Cloud Challenge",
    organizer: "CloudTech India",

    description:
      "Build scalable cloud solutions and automate modern software delivery pipelines.",

    category: "Technology",
    mode: "Online",
    difficulty: "Advanced",
    location: "Online",

    prize: "₹1,75,000",
    participants: 160,
    maxParticipants: 350,

    deadline: "18 December 2026",
    duration: "48 Hours",
    startDate: "22 December 2026",
    endDate: "24 December 2026",

    image: cybersecurity,
    featured: false,

    skills: [
      "DevOps",
      "Cloud Computing",
      "Docker",
      "CI/CD",
    ],

    overview:
      "Participants will design cloud-native applications, implement CI/CD pipelines, automate infrastructure, and demonstrate modern DevOps practices.",

    eligibility:
      "Students, DevOps enthusiasts, cloud engineers, developers, and IT professionals can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Automation",
      "Cloud architecture",
      "Scalability",
      "Reliability",
      "Technical implementation",
    ],

    requirements: [
      "Participants should understand basic cloud concepts.",
      "A working deployment is required.",
      "Teams can contain up to 4 members.",
      "CI/CD or automation should be demonstrated.",
      "Project documentation is required.",
    ],

    rules: [
      "Participants must use legal and authorized cloud resources.",
      "Projects must be original.",
      "Security best practices should be followed.",
      "Projects must be submitted on time.",
      "Participants must demonstrate their deployment.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "18 December 2026",
      },
      {
        title: "Hackathon Starts",
        date: "22 December 2026",
      },
      {
        title: "Project Submission",
        date: "24 December 2026",
      },
      {
        title: "Winner Announcement",
        date: "27 December 2026",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹85,000",
      },
      {
        position: "2nd Prize",
        amount: "₹55,000",
      },
      {
        position: "3rd Prize",
        amount: "₹35,000",
      },
    ],
  },

  // ============================================================
  // 13. SMART HEALTHCARE
  // ============================================================
  {
    id: 13,
    title: "Smart Healthcare Hackathon",
    organizer: "HealthTech Innovations",

    description:
      "Develop technology solutions that improve healthcare accessibility and services.",

    category: "Artificial Intelligence",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹1,80,000",
    participants: 190,
    maxParticipants: 400,

    deadline: "25 December 2026",
    duration: "48 Hours",
    startDate: "29 December 2026",
    endDate: "31 December 2026",

    image: aiHackathon,
    featured: true,

    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "React",
      "Data Analytics",
    ],

    overview:
      "The Smart Healthcare Hackathon challenges participants to create technology solutions for healthcare accessibility, patient management, health awareness, and intelligent healthcare services.",

    eligibility:
      "Students, developers, healthcare enthusiasts, AI enthusiasts, and technology professionals can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Healthcare impact",
      "Innovation",
      "Technical feasibility",
      "User experience",
      "Presentation",
    ],

    requirements: [
      "Project must address a healthcare-related problem.",
      "Participants must clearly explain the solution.",
      "Teams can have up to 4 members.",
      "A working prototype is recommended.",
      "Participants must provide documentation.",
    ],

    rules: [
      "Projects must be original.",
      "Sensitive information must not be misused.",
      "Participants must follow ethical guidelines.",
      "Projects must be submitted before the deadline.",
      "Participants must clearly explain limitations.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "25 December 2026",
      },
      {
        title: "Hackathon Starts",
        date: "29 December 2026",
      },
      {
        title: "Project Submission",
        date: "31 December 2026",
      },
      {
        title: "Winner Announcement",
        date: "3 January 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹90,000",
      },
      {
        position: "2nd Prize",
        amount: "₹55,000",
      },
      {
        position: "3rd Prize",
        amount: "₹35,000",
      },
    ],
  },

  // ============================================================
  // 14. OPEN SOURCE REVOLUTION
  // ============================================================
  {
    id: 14,
    title: "Open Source Revolution",
    organizer: "OpenTech Community",

    description:
      "Build meaningful open-source projects and contribute to the developer community.",

    category: "Web Development",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹1,20,000",
    participants: 250,
    maxParticipants: 500,

    deadline: "5 January 2027",
    duration: "48 Hours",
    startDate: "9 January 2027",
    endDate: "11 January 2027",

    image: webDevelopment,
    featured: false,

    skills: [
      "Git",
      "GitHub",
      "JavaScript",
      "React",
    ],

    overview:
      "The Open Source Revolution hackathon encourages developers to build useful open-source tools, libraries, platforms, and applications for the developer community.",

    eligibility:
      "Students, developers, open-source contributors, and technology enthusiasts can participate.",

    teamSize: "1 - 5 members",

    judgingCriteria: [
      "Open-source contribution",
      "Code quality",
      "Innovation",
      "Documentation",
      "Community impact",
    ],

    requirements: [
      "Project source code must be available.",
      "README documentation is required.",
      "Participants should use version control.",
      "Teams can contain up to 5 members.",
      "Project must provide useful functionality.",
    ],

    rules: [
      "Projects must follow open-source licensing rules.",
      "Plagiarized code is not allowed.",
      "Contributors must be properly acknowledged.",
      "Projects must be submitted before the deadline.",
      "Participants must follow the community code of conduct.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "5 January 2027",
      },
      {
        title: "Hackathon Starts",
        date: "9 January 2027",
      },
      {
        title: "Project Submission",
        date: "11 January 2027",
      },
      {
        title: "Winner Announcement",
        date: "14 January 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹60,000",
      },
      {
        position: "2nd Prize",
        amount: "₹35,000",
      },
      {
        position: "3rd Prize",
        amount: "₹25,000",
      },
    ],
  },

  // ============================================================
  // 15. CYBER DEFENSE
  // ============================================================
  {
    id: 15,
    title: "Cyber Defense Challenge 2026",
    organizer: "CyberGuard India",

    description:
      "Create innovative cybersecurity solutions for protecting modern digital systems.",

    category: "Cybersecurity",
    mode: "Offline",
    difficulty: "Advanced",
    location: "Pune, India",

    prize: "₹2,00,000",
    participants: 150,
    maxParticipants: 300,

    deadline: "12 January 2027",
    duration: "48 Hours",
    startDate: "16 January 2027",
    endDate: "18 January 2027",

    image: cybersecurity,
    featured: true,

    skills: [
      "Cybersecurity",
      "Ethical Hacking",
      "Networking",
      "Linux",
    ],

    overview:
      "Participants will design solutions for threat detection, vulnerability management, secure applications, network protection, and cybersecurity automation.",

    eligibility:
      "Students, ethical hackers, cybersecurity enthusiasts, developers, and security professionals can participate.",

    teamSize: "2 - 4 members",

    judgingCriteria: [
      "Security effectiveness",
      "Innovation",
      "Technical implementation",
      "Threat detection",
      "Presentation",
    ],

    requirements: [
      "Participants should understand cybersecurity fundamentals.",
      "Teams should contain 2 to 4 members.",
      "Security testing must be performed only in authorized environments.",
      "Working demonstration is required.",
      "Participants must explain their security approach.",
    ],

    rules: [
      "No attacks against unauthorized systems.",
      "Participants must follow the event security rules.",
      "All projects must be original.",
      "Malicious activity outside the event environment is prohibited.",
      "Projects must be submitted before the deadline.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "12 January 2027",
      },
      {
        title: "Hackathon Starts",
        date: "16 January 2027",
      },
      {
        title: "Project Submission",
        date: "18 January 2027",
      },
      {
        title: "Winner Announcement",
        date: "21 January 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,00,000",
      },
      {
        position: "2nd Prize",
        amount: "₹60,000",
      },
      {
        position: "3rd Prize",
        amount: "₹40,000",
      },
    ],
  },

  // ============================================================
  // 16. NEXTGEN ROBOTICS
  // ============================================================
  {
    id: 16,
    title: "NextGen Robotics Hackathon",
    organizer: "Robotics India",

    description:
      "Build intelligent robotic solutions for real-world applications.",

    category: "Technology",
    mode: "Offline",
    difficulty: "Advanced",
    location: "Mumbai, India",

    prize: "₹2,25,000",
    participants: 130,
    maxParticipants: 250,

    deadline: "20 January 2027",
    duration: "48 Hours",
    startDate: "24 January 2027",
    endDate: "26 January 2027",

    image: appDevelopment,
    featured: false,

    skills: [
      "Robotics",
      "Artificial Intelligence",
      "IoT",
      "Python",
    ],

    overview:
      "The NextGen Robotics Hackathon brings together developers, engineers, and innovators to build intelligent robotic systems for practical applications.",

    eligibility:
      "Engineering students, robotics enthusiasts, developers, and technology professionals can participate.",

    teamSize: "2 - 5 members",

    judgingCriteria: [
      "Robot functionality",
      "Innovation",
      "Technical implementation",
      "Automation",
      "Real-world usefulness",
    ],

    requirements: [
      "Participants should have basic robotics knowledge.",
      "Teams should have 2 to 5 members.",
      "A working prototype is required.",
      "Participants must demonstrate their robotic solution.",
      "Technical documentation must be submitted.",
    ],

    rules: [
      "Robots must operate safely.",
      "Participants must follow venue safety guidelines.",
      "Projects must be original.",
      "Participants must use authorized hardware.",
      "Projects must be demonstrated before submission.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "20 January 2027",
      },
      {
        title: "Hackathon Starts",
        date: "24 January 2027",
      },
      {
        title: "Project Submission",
        date: "26 January 2027",
      },
      {
        title: "Winner Announcement",
        date: "29 January 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,10,000",
      },
      {
        position: "2nd Prize",
        amount: "₹70,000",
      },
      {
        position: "3rd Prize",
        amount: "₹45,000",
      },
    ],
  },

  // ============================================================
  // 17. BLOCKCHAIN & WEB3
  // ============================================================
  {
    id: 17,
    title: "Blockchain & Web3 India",
    organizer: "Web3 Builders",

    description:
      "Build decentralized applications and innovative Web3 solutions.",

    category: "FinTech",
    mode: "Online",
    difficulty: "Advanced",
    location: "Online",

    prize: "₹2,50,000",
    participants: 230,
    maxParticipants: 450,

    deadline: "28 January 2027",
    duration: "48 Hours",
    startDate: "1 February 2027",
    endDate: "3 February 2027",

    image: fintech,
    featured: true,

    skills: [
      "Blockchain",
      "Web3",
      "Smart Contracts",
      "React",
    ],

    overview:
      "Participants will create decentralized applications, blockchain-based platforms, smart contracts, and innovative Web3 products.",

    eligibility:
      "Students, developers, blockchain enthusiasts, and Web3 builders can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Innovation",
      "Blockchain implementation",
      "Security",
      "Usability",
      "Scalability",
    ],

    requirements: [
      "Project should use blockchain meaningfully.",
      "Participants must explain the architecture.",
      "Teams can have up to 4 members.",
      "A working prototype is required.",
      "Security considerations must be documented.",
    ],

    rules: [
      "Projects must be original.",
      "Participants must follow blockchain network rules.",
      "No fraudulent or deceptive applications.",
      "Smart contracts must be tested before demonstration.",
      "Projects must be submitted before the deadline.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "28 January 2027",
      },
      {
        title: "Hackathon Starts",
        date: "1 February 2027",
      },
      {
        title: "Project Submission",
        date: "3 February 2027",
      },
      {
        title: "Winner Announcement",
        date: "6 February 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,25,000",
      },
      {
        position: "2nd Prize",
        amount: "₹75,000",
      },
      {
        position: "3rd Prize",
        amount: "₹50,000",
      },
    ],
  },

  // ============================================================
  // 18. AI FOR SOCIAL GOOD
  // ============================================================
  {
    id: 18,
    title: "AI for Social Good",
    organizer: "ImpactTech Foundation",

    description:
      "Use artificial intelligence to create solutions that improve communities and society.",

    category: "Artificial Intelligence",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹1,50,000",
    participants: 210,
    maxParticipants: 400,

    deadline: "5 February 2027",
    duration: "36 Hours",
    startDate: "9 February 2027",
    endDate: "10 February 2027",

    image: aiHackathon,
    featured: false,

    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Python",
      "Data Science",
    ],

    overview:
      "AI for Social Good focuses on using artificial intelligence and data-driven technologies to solve problems related to education, accessibility, agriculture, environment, healthcare, and community development.",

    eligibility:
      "Students, developers, researchers, AI enthusiasts, and social innovators can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Social impact",
      "Innovation",
      "Technical implementation",
      "Scalability",
      "Presentation",
    ],

    requirements: [
      "Project must address a social problem.",
      "AI should be used meaningfully.",
      "Participants must explain the expected impact.",
      "Teams can contain up to 4 members.",
      "Project documentation is required.",
    ],

    rules: [
      "Projects must be original.",
      "AI must be used responsibly.",
      "Participants must consider ethical concerns.",
      "Projects must be submitted before the deadline.",
      "All team members should contribute.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "5 February 2027",
      },
      {
        title: "Hackathon Starts",
        date: "9 February 2027",
      },
      {
        title: "Project Submission",
        date: "10 February 2027",
      },
      {
        title: "Winner Announcement",
        date: "13 February 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹75,000",
      },
      {
        position: "2nd Prize",
        amount: "₹45,000",
      },
      {
        position: "3rd Prize",
        amount: "₹30,000",
      },
    ],
  },

  // ============================================================
  // 19. MOBILE APP INNOVATION
  // ============================================================
  {
    id: 19,
    title: "Mobile App Innovation Hackathon",
    organizer: "AppTech Community",

    description:
      "Build innovative mobile applications that solve everyday problems.",

    category: "App Development",
    mode: "Online",
    difficulty: "Intermediate",
    location: "Online",

    prize: "₹1,25,000",
    participants: 175,
    maxParticipants: 350,

    deadline: "12 February 2027",
    duration: "36 Hours",
    startDate: "16 February 2027",
    endDate: "17 February 2027",

    image: appDevelopment,
    featured: false,

    skills: [
      "React Native",
      "JavaScript",
      "UI/UX",
      "Firebase",
    ],

    overview:
      "Participants will create useful and innovative mobile applications for education, productivity, healthcare, finance, entertainment, and everyday life.",

    eligibility:
      "Students, mobile developers, designers, and technology enthusiasts can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "App functionality",
      "User experience",
      "Innovation",
      "Performance",
      "Presentation",
    ],

    requirements: [
      "A working mobile application or prototype is required.",
      "Application should solve a real problem.",
      "Teams can have up to 4 members.",
      "UI/UX should be considered.",
      "Participants must provide documentation.",
    ],

    rules: [
      "Applications must be original.",
      "Third-party libraries are allowed.",
      "Participants must submit before the deadline.",
      "Applications should follow basic security practices.",
      "Participants must demonstrate the application.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "12 February 2027",
      },
      {
        title: "Hackathon Starts",
        date: "16 February 2027",
      },
      {
        title: "Project Submission",
        date: "17 February 2027",
      },
      {
        title: "Winner Announcement",
        date: "20 February 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹60,000",
      },
      {
        position: "2nd Prize",
        amount: "₹40,000",
      },
      {
        position: "3rd Prize",
        amount: "₹25,000",
      },
    ],
  },

  // ============================================================
  // 20. CLOUD COMPUTING
  // ============================================================
  {
    id: 20,
    title: "Cloud Computing Innovation Challenge",
    organizer: "Cloud Innovators",

    description:
      "Create scalable and reliable cloud-based applications for the future.",

    category: "Technology",
    mode: "Online",
    difficulty: "Advanced",
    location: "Online",

    prize: "₹2,00,000",
    participants: 200,
    maxParticipants: 400,

    deadline: "20 February 2027",
    duration: "48 Hours",
    startDate: "24 February 2027",
    endDate: "26 February 2027",

    image: cybersecurity,
    featured: false,

    skills: [
      "Cloud Computing",
      "AWS",
      "Docker",
      "DevOps",
    ],

    overview:
      "The Cloud Computing Innovation Challenge focuses on building scalable, reliable, secure, and cost-effective cloud-based applications and services.",

    eligibility:
      "Students, cloud developers, DevOps engineers, and technology professionals can participate.",

    teamSize: "1 - 4 members",

    judgingCriteria: [
      "Cloud architecture",
      "Scalability",
      "Reliability",
      "Security",
      "Innovation",
    ],

    requirements: [
      "Project should use cloud technology.",
      "Participants must demonstrate the deployed solution.",
      "Teams can have up to 4 members.",
      "Cloud architecture must be documented.",
      "Participants must explain scalability.",
    ],

    rules: [
      "Participants must use authorized cloud services.",
      "Projects must be original.",
      "Security best practices must be followed.",
      "Participants must submit before the deadline.",
      "Cloud resources must be used responsibly.",
    ],

    timeline: [
      {
        title: "Registration Deadline",
        date: "20 February 2027",
      },
      {
        title: "Hackathon Starts",
        date: "24 February 2027",
      },
      {
        title: "Project Submission",
        date: "26 February 2027",
      },
      {
        title: "Winner Announcement",
        date: "1 March 2027",
      },
    ],

    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,00,000",
      },
      {
        position: "2nd Prize",
        amount: "₹60,000",
      },
      {
        position: "3rd Prize",
        amount: "₹40,000",
      },
    ],
  },
];


/* ============================================================
   CATEGORIES
============================================================ */

export const categories = [
  "All",
  "Artificial Intelligence",
  "Web Development",
  "Cybersecurity",
  "Technology",
  "FinTech",
  "App Development",
];


/* ============================================================
   MODES
============================================================ */

export const modes = [
  "All",
  "Online",
  "Offline",
];


/* ============================================================
   DIFFICULTIES
============================================================ */

export const difficulties = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];