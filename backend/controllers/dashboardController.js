// In-memory dashboard mock data

const skillRadarData = [
  { subject: "React/JS", user: 80, industry: 90, fullMark: 100 },
  { subject: "Python", user: 65, industry: 85, fullMark: 100 },
  { subject: "Deep Learning", user: 40, industry: 75, fullMark: 100 },
  { subject: "Data Analysis", user: 60, industry: 70, fullMark: 100 },
  { subject: "UI/UX", user: 85, industry: 60, fullMark: 100 },
  { subject: "SQL", user: 75, industry: 80, fullMark: 100 },
];

const progressData = [
  { day: "Sen", jam: 2 },
  { day: "Sel", jam: 4 },
  { day: "Rab", jam: 3 },
  { day: "Kam", jam: 6 },
  { day: "Jum", jam: 5 },
  { day: "Sab", jam: 8 },
  { day: "Min", jam: 2 },
];

const matchScore = {
  score: 78,
  trend: "+12%",
  description: "Based on 500+ Deep Learning job postings."
};

const roadmap = {
  mingguIni: [
    { title: "Python for Data Science", desc: "Mempelajari Pandas & NumPy untuk ekstraksi fitur.", logo: "Py", progress: 75 }
  ],
  mingguDepan: [
    { title: "Intro to Neural Networks", desc: "Mempersiapkan teori untuk model rekomendasi.", logo: "NN", progress: 0 },
    { title: "React Integration", desc: "Menghubungkan frontend dengan API Python.", logo: "UI", progress: 0 }
  ]
};

const courses = [
  { title: "Deep Learning Specialization", provider: "Coursera", duration: "4 Weeks", logo: "D", color: "bg-blue" },
  { title: "Advanced React Patterns", provider: "Udemy", duration: "12 Hours", logo: "A", color: "bg-pink" },
  { title: "SQL for Data Analysis", provider: "Dicoding", level: "Intermediate", logo: "S", color: "bg-purple" }
];

// @desc    Get dashboard statistics and data
// @route   GET /api/dashboard
// @access  Public
export const getDashboardData = (req, res) => {
  res.json({
    skillRadarData,
    progressData,
    matchScore,
    roadmap,
    courses
  });
};
