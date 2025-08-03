import { PrismaClient, UserRole, JobType, CategoryType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Tags
  const tagNames = [
    "React",
    "Node.js",
    "AWS",
    "Python",
    "SQL",
    "Docker",
    "Kubernetes",
    "Marketing",
    "Design",
    "Data Analysis",
  ];
  await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // Companies
  const companiesData = [
    {
      id: "company1",
      name: "Sweetgreen",
      logoUrl:
        "https://img.logo.dev/sweetgreen.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://sweetgreen.com",
    },
    {
      id: "company2",
      name: "Spotify",
      logoUrl:
        "https://img.logo.dev/spotify.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://spotify.com",
    },
    {
      id: "company3",
      name: "Netflix",
      logoUrl:
        "https://img.logo.dev/netflix.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://netflix.com",
    },
    {
      id: "company4",
      name: "Zoom",
      logoUrl: "https://img.logo.dev/zoom.us?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://zoom.us",
    },
    {
      id: "company5",
      name: "Slack",
      logoUrl: "https://img.logo.dev/slack.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://slack.com",
    },
    {
      id: "company6",
      name: "Airbnb",
      logoUrl:
        "https://img.logo.dev/airbnb.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://airbnb.com",
    },
    {
      id: "company7",
      name: "Stripe",
      logoUrl:
        "https://img.logo.dev/stripe.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://stripe.com",
    },
    {
      id: "company8",
      name: "Uber",
      logoUrl: "https://img.logo.dev/uber.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://uber.com",
    },
    {
      id: "company9",
      name: "Paypal",
      logoUrl:
        "https://img.logo.dev/paypal.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://paypal.com",
    },
    {
      id: "company10",
      name: "Adobe",
      logoUrl: "https://img.logo.dev/adobe.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://adobe.com",
    },
    {
      id: "company11",
      name: "Microsoft",
      logoUrl:
        "https://img.logo.dev/microsoft.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://microsoft.com",
    },
    {
      id: "company12",
      name: "Apple",
      logoUrl: "https://img.logo.dev/apple.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://apple.com",
    },
    {
      id: "company13",
      name: "Google",
      logoUrl:
        "https://img.logo.dev/google.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://google.com",
    },
    {
      id: "company14",
      name: "Intel",
      logoUrl: "https://img.logo.dev/intel.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://intel.com",
    },
    {
      id: "company15",
      name: "Nvidia",
      logoUrl:
        "https://img.logo.dev/nvidia.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://nvidia.com",
    },
    {
      id: "company16",
      name: "Twitter",
      logoUrl:
        "https://img.logo.dev/twitter.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://twitter.com",
    },
    {
      id: "company17",
      name: "Facebook",
      logoUrl:
        "https://img.logo.dev/facebook.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://facebook.com",
    },
    {
      id: "company18",
      name: "Salesforce",
      logoUrl:
        "https://img.logo.dev/salesforce.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://salesforce.com",
    },
    {
      id: "company19",
      name: "Dropbox",
      logoUrl:
        "https://img.logo.dev/dropbox.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://dropbox.com",
    },
    {
      id: "company20",
      name: "Zoominfo",
      logoUrl:
        "https://img.logo.dev/zoominfo.com?token=pk_JNKc22BjSjKAE2e6jICBFg",
      website: "https://zoominfo.com",
    },
  ];

  await prisma.company.createMany({ data: companiesData });

  // Users
  const usersData = [
    {
      id: "user1",
      email: "alice@example.com",
      password: "hashedpassword1",
      name: "Alice",
      role: UserRole.jobseeker,
    },
    {
      id: "user2",
      email: "bob@example.com",
      password: "hashedpassword2",
      name: "Bob",
      role: UserRole.jobseeker,
    },
    {
      id: "user3",
      email: "carol@example.com",
      password: "hashedpassword3",
      name: "Carol",
      role: UserRole.jobseeker,
    },
    {
      id: "user4",
      email: "dave@example.com",
      password: "hashedpassword4",
      name: "Dave",
      role: UserRole.jobseeker,
    },
    {
      id: "user5",
      email: "employer1@sweetgreen.com",
      password: "hashedpassword5",
      name: "Emily Employer",
      role: UserRole.employer,
      companyId: "company1",
    },
    {
      id: "user6",
      email: "employer2@spotify.com",
      password: "hashedpassword6",
      name: "Frank Employer",
      role: UserRole.employer,
      companyId: "company2",
    },
    {
      id: "user7",
      email: "employer3@netflix.com",
      password: "hashedpassword7",
      name: "Grace Employer",
      role: UserRole.employer,
      companyId: "company3",
    },
    {
      id: "user8",
      email: "employer4@zoom.com",
      password: "hashedpassword8",
      name: "Hank Employer",
      role: UserRole.employer,
      companyId: "company4",
    },
    {
      id: "user9",
      email: "employer5@slack.com",
      password: "hashedpassword9",
      name: "Ivy Employer",
      role: UserRole.employer,
      companyId: "company5",
    },
    {
      id: "user10",
      email: "jane@example.com",
      password: "hashedpassword10",
      name: "Jane Jobseeker",
      role: UserRole.jobseeker,
    },
  ];

  await prisma.user.createMany({ data: usersData });

  // Jobs
  const jobsData = [
    {
      id: "job1",
      title: "Frontend Developer",
      description: `Join Sweetgreen’s web team to build engaging, performant user interfaces. You should be proficient in React, Next.js, and Tailwind CSS. Daily tasks include consuming RESTful APIs, managing global state with Redux or React Query, and optimizing accessibility. Git version control and code review participation complete the workflow.`,
      salary: 85000,
      location: "onsite",
      type: JobType.full_time,
      companyId: "company1",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job2",
      title: "Data Analyst",
      description: `Spotify is seeking a Data Analyst skilled in SQL and Python to analyze user data. You’ll develop dashboards using Tableau and Power BI, clean datasets, and extract actionable insights. Cross-team communication and statistical knowledge are essential for guiding business decisions.`,
      salary: 72000,
      location: "hybrid",
      type: JobType.part_time,
      companyId: "company2",
      category: CategoryType.other,
      createdAt: new Date(),
    },
    {
      id: "job3",
      title: "DevOps Engineer",
      description: `Netflix needs a DevOps Engineer experienced with AWS, Docker, Kubernetes, and Terraform. Responsibilities include building CI/CD pipelines, automating deployments, and monitoring system health. You should be familiar with Linux servers and version control using Git.`,
      salary: 95000,
      location: "remote",
      type: JobType.full_time,
      companyId: "company3",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job4",
      title: "UI/UX Designer",
      description: `Zoom is hiring a UI/UX Designer with strong skills in Figma and Adobe XD. You will create wireframes, mockups, and prototypes, conduct usability testing, and develop design systems. Knowledge of accessibility and user journey mapping is required.`,
      salary: 70000,
      location: "onsite",
      type: JobType.contract,
      companyId: "company4",
      category: CategoryType.design,
      createdAt: new Date(),
    },
    {
      id: "job5",
      title: "AI Research Intern",
      description: `Slack seeks an AI Research Intern to work with NLP and computer vision. You’ll develop models using PyTorch and Hugging Face Transformers, fine-tune algorithms, and collaborate with senior researchers. Familiarity with Python, NumPy, and OpenCV is a must.`,
      salary: 30000,
      location: "hybrid",
      type: JobType.contract,
      companyId: "company5",
      category: CategoryType.other,
      createdAt: new Date(),
    },
    {
      id: "job6",
      title: "Backend Developer",
      description: `Airbnb requires a Backend Developer proficient in Node.js, Express, and PostgreSQL. You will build scalable APIs, optimize queries, and implement secure authentication with OAuth or JWT. Docker and AWS experience are advantageous.`,
      salary: 90000,
      location: "remote",
      type: JobType.full_time,
      companyId: "company6",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job7",
      title: "Mobile App Developer",
      description: `Stripe is looking for a Mobile Developer skilled in React Native or Flutter. Responsibilities include building performant cross-platform apps, integrating REST APIs, and managing app deployment. Familiarity with push notifications and app store submission processes is expected.`,
      salary: 88000,
      location: "hybrid",
      type: JobType.full_time,
      companyId: "company7",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job8",
      title: "Security Analyst",
      description: `Uber needs a Security Analyst to conduct penetration testing and manage incident response. Knowledge of SIEM tools, secure coding practices, and vulnerability assessments is essential. Collaboration with DevOps and development teams to maintain security is required.`,
      salary: 92000,
      location: "onsite",
      type: JobType.full_time,
      companyId: "company8",
      category: CategoryType.other,
      createdAt: new Date(),
    },
    {
      id: "job9",
      title: "Product Manager",
      description: `Paypal is hiring a Product Manager to drive product strategy and roadmap. You should be familiar with Agile methodologies, user story writing, and stakeholder management. Market research and prioritizing features based on user needs are key tasks.`,
      salary: 105000,
      location: "hybrid",
      type: JobType.full_time,
      companyId: "company9",
      category: CategoryType.other,
      createdAt: new Date(),
    },
    {
      id: "job10",
      title: "Quality Assurance Engineer",
      description: `Adobe is seeking a QA Engineer to design test plans and automate test cases using Selenium, Jest, or Cypress. You will collaborate with developers to ensure high software quality. Experience with CI/CD and bug tracking tools like Jira is a plus.`,
      salary: 75000,
      location: "remote",
      type: JobType.contract,
      companyId: "company10",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job11",
      title: "Business Analyst",
      description: `Microsoft wants a Business Analyst to gather requirements, model processes, and communicate with stakeholders. Strong data analysis and documentation skills are required. You’ll support project teams to align technical solutions with business goals.`,
      salary: 70000,
      location: "onsite",
      type: JobType.full_time,
      companyId: "company11",
      category: CategoryType.other,
      createdAt: new Date(),
    },
    {
      id: "job12",
      title: "Growth Marketer",
      description: `Apple seeks a Growth Marketer to plan and execute campaigns driving user acquisition. You’ll leverage SEO, SEM, Google Analytics, and A/B testing skills. Analyzing funnel metrics and optimizing conversions are daily responsibilities.`,
      salary: 68000,
      location: "remote",
      type: JobType.part_time,
      companyId: "company12",
      category: CategoryType.marketing,
      createdAt: new Date(),
    },
    {
      id: "job13",
      title: "Game Developer",
      description: `Google is hiring a Game Developer experienced in Unity or Unreal Engine. You’ll build game features, optimize performance, and collaborate with artists. Proficiency in C# or C++, and knowledge of game physics and AI, are essential.`,
      salary: 92000,
      location: "onsite",
      type: JobType.full_time,
      companyId: "company13",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job14",
      title: "Data Engineer",
      description: `Intel wants a Data Engineer to create scalable pipelines with Spark, Kafka, and Airflow. You’ll ensure data quality and optimize cloud storage using AWS or GCP. Proficiency in Python or Scala is required to support analytics workloads.`,
      salary: 98000,
      location: "remote",
      type: JobType.full_time,
      companyId: "company14",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job15",
      title: "Support Engineer",
      description: `Nvidia is seeking a Support Engineer to resolve customer issues related to networking, Linux, and databases. You’ll work with ticketing tools like Zendesk and escalate technical problems to development teams. Strong communication skills are essential.`,
      salary: 60000,
      location: "hybrid",
      type: JobType.full_time,
      companyId: "company15",
      category: CategoryType.other,
      createdAt: new Date(),
    },
    {
      id: "job16",
      title: "Cloud Architect",
      description: `Twitter wants a Cloud Architect to design scalable, secure cloud infrastructure. Expertise in AWS, Azure, or GCP, along with infrastructure as code, is required. You will optimize costs and ensure compliance with security standards.`,
      salary: 115000,
      location: "remote",
      type: JobType.full_time,
      companyId: "company16",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job17",
      title: "Technical Writer",
      description: `Facebook seeks a Technical Writer to create clear documentation, API guides, and tutorials. Experience with Markdown, Git, and developer tools is necessary. Ability to translate complex technical topics into simple language is key.`,
      salary: 65000,
      location: "onsite",
      type: JobType.contract,
      companyId: "company17",
      category: CategoryType.other,
      createdAt: new Date(),
    },
    {
      id: "job18",
      title: "Machine Learning Engineer",
      description: `Salesforce needs a Machine Learning Engineer to build, train, and deploy models with TensorFlow or PyTorch. Collaborate with data scientists to integrate ML in production. Strong Python skills and statistical knowledge are required.`,
      salary: 110000,
      location: "remote",
      type: JobType.full_time,
      companyId: "company18",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job19",
      title: "Embedded Systems Engineer",
      description: `Dropbox is hiring an Embedded Systems Engineer skilled in C/C++ for IoT device firmware. You will develop real-time applications, debug hardware interfaces, and work with protocols like SPI, I2C, and UART.`,
      salary: 90000,
      location: "onsite",
      type: JobType.full_time,
      companyId: "company19",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
    {
      id: "job20",
      title: "Full Stack Developer",
      description: `Zoominfo is looking for a Full Stack Developer proficient in JavaScript/TypeScript, React, Node.js, and PostgreSQL. You’ll build end-to-end web applications, ensure code quality, and work with Docker and testing frameworks.`,
      salary: 95000,
      location: "hybrid",
      type: JobType.full_time,
      companyId: "company20",
      category: CategoryType.software_development,
      createdAt: new Date(),
    },
  ];

  await prisma.job.createMany({ data: jobsData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
