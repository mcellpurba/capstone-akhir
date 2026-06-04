-- Tabel Users (Untuk Register dan Login)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Profiles (Data Profil User)
CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  name VARCHAR(255),
  title VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  address VARCHAR(255),
  summary TEXT,
  photo TEXT,
  skills TEXT[]
);

-- Tabel Experiences (Pengalaman Kerja pada Profil)
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  profile_username VARCHAR(255) REFERENCES profiles(username) ON DELETE CASCADE,
  role VARCHAR(255),
  company VARCHAR(255),
  period VARCHAR(255),
  description TEXT
);

-- Tabel Courses (Rekomendasi Kursus di Dashboard)
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  provider VARCHAR(255),
  duration VARCHAR(50),
  level VARCHAR(50),
  logo VARCHAR(10),
  color VARCHAR(50)
);

-- Tabel Roadmaps (Rencana Belajar di Dashboard)
CREATE TABLE IF NOT EXISTS roadmaps (
  id SERIAL PRIMARY KEY,
  week_type VARCHAR(50), -- 'mingguIni' atau 'mingguDepan'
  title VARCHAR(255),
  "desc" TEXT,
  logo VARCHAR(10),
  progress INTEGER
);

-- Insert Data Awal untuk Courses
INSERT INTO courses (title, provider, duration, level, logo, color) VALUES 
('Deep Learning Specialization', 'Coursera', '4 Weeks', NULL, 'D', 'bg-blue'),
('Advanced React Patterns', 'Udemy', '12 Hours', NULL, 'A', 'bg-pink'),
('SQL for Data Analysis', 'Dicoding', NULL, 'Intermediate', 'S', 'bg-purple');

-- Insert Data Awal untuk Roadmaps
INSERT INTO roadmaps (week_type, title, "desc", logo, progress) VALUES 
('mingguIni', 'Python for Data Science', 'Mempelajari Pandas & NumPy untuk ekstraksi fitur.', 'Py', 75),
('mingguDepan', 'Intro to Neural Networks', 'Mempersiapkan teori untuk model rekomendasi.', 'NN', 0),
('mingguDepan', 'React Integration', 'Menghubungkan frontend dengan API Python.', 'UI', 0);
