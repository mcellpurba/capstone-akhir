# 🚀 MyJobTrend — Predicted Skills Recommendation System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

**MyJobTrend** is a full-stack web application designed to bridge the gap between job seekers and the job market. It provides intelligent job searching, CV analysis, AI chatbot assistance, and machine learning-powered skill recommendations to help users stay competitive in their careers.

---

## 🌟 Key Features

- **💼 Job Search Platform**: Browse and search through extensive job listings with realistic filtering (salary, experience level, job type).
- **📊 CV Analyzer Dashboard**: Upload your CV and get a dynamic, data-driven analysis of your skills, identifying gaps based on real market demands.
- **🤖 Job Prediction (ML)**: Paste a job description and our deep learning model will predict and recommend the skills you need to acquire.
- **💬 AI Chatbot**: Interactive assistant to help you navigate your career path and answer job-related questions.
- **🔐 User Authentication**: Secure login and registration system with JWT authentication and personalized profiles.

---

## 🏗️ Architecture & Tech Stack

This project is built using a modern Microservices-like architecture comprising three main components:

1. **Frontend**: Built with **React.js** and **Vite**, offering a lightning-fast, responsive, and interactive user interface.
2. **Backend**: Built with **Node.js** and **Express.js**, serving as a robust REST API for authentication, job data, and user profiles, backed by a **PostgreSQL** database.
3. **ML API**: Built with **Python** and **Flask**, serving a Deep Learning model (Keras/TensorFlow) for advanced natural language processing and skill prediction.

---

## 📂 Project Structure

```text
capstone_final/
├── src/                        # ⚛️ React Frontend
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Page views (Home, Dashboard, JobSearch, etc.)
│   ├── data/                   # Mock data and constants (e.g., dummyJobs)
│   └── styles/                 # CSS stylesheets
├── backend/                    # 🟢 Node.js Express API
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoint definitions
│   ├── config/                 # Database and environment configurations
│   ├── schema.sql              # PostgreSQL database schemas
│   └── server.js               # Entry point
└── ml_api/                     # 🐍 Python Flask ML API
    ├── app.py                  # API routes and model inference
    ├── requirements.txt        # Python dependencies
    └── models/                 # Pre-trained models (.pkl, .keras)
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Python** (3.9 or higher)
- **PostgreSQL** (running locally or remotely)
- **Git**

### 1. Database Setup (PostgreSQL)
1. Create a PostgreSQL database named `myjobtrend` (or any name of your choice).
2. Navigate to the `backend/` directory.
3. Execute the SQL scripts (`schema.sql` and `schema_tambahan.sql`) in your database to create the necessary tables.

### 2. Backend Setup (Node.js)
Open your first terminal and run:

```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory and configure your environment variables:
```env
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
JWT_SECRET=your_super_secret_key
PORT=5000
```
Start the backend server:
```bash
npm run dev
```
*(Runs on `http://localhost:5000`)*

### 3. Machine Learning API Setup (Python)
Open a second terminal and run:

```bash
cd ml_api
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask API
python app.py
```
*(Runs on `http://localhost:5001`)*

### 4. Frontend Setup (React)
Open a third terminal in the root directory (`capstone_final/`) and run:

```bash
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## 💻 Usage Instructions

1. Open your browser and navigate to `http://localhost:5173`.
2. **Register** a new account and **Login**.
3. Explore the **Job Search** page to find careers tailored to your interests.
4. Try out the **Job Prediction** tool by pasting a job description to get skill recommendations.
5. Go to the **Dashboard** to view insights on your uploaded CV.
6. Chat with the **AI Assistant** for any career-related advice.

---

## 🛠️ Troubleshooting

- **ML API fails to start / Model loading error:** 
  Ensure all `.pkl` and `.keras` files are present in the `ml_api/models/` directory. If TensorFlow installation fails, try `pip install tensorflow-cpu`. The API will fallback to keyword matching if the Keras model fails to load.
- **Frontend cannot connect to Backend:** 
  Verify that your Node.js server is running on port `5000` and that your PostgreSQL database credentials in `.env` are correct.
- **CORS Issues:** 
  Ensure that your backend server allows requests from `http://localhost:5173`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Capstone Team
CC26-PSU129

*Developed with ❤️ by the Capstone Team.*
