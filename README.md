# MyJobTrend — Skill Recommendation System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

A full-stack web app that helps job seekers understand market skill demands. Features include job search, CV analysis, ML-based skill prediction, and a career chatbot.

---

## Dependencies

**Frontend** — `package.json`

| Package | Version |
|---|---|
| react | ^19.2.5 |
| react-router-dom | ^7.14.1 |
| recharts | ^3.8.1 |
| vite | ^8.0.9 |

**Backend** — `backend/package.json`

| Package | Version |
|---|---|
| express | ^5.2.1 |
| pg | ^8.21.0 |
| dotenv | ^17.4.2 |
| cors | ^2.8.6 |

**ML API** — `ml_api/requirements.txt`

| Package | Version |
|---|---|
| flask | 3.0.3 |
| tensorflow | >=2.13.0 |
| scikit-learn | >=1.3.0 |

**CV Analyzer API** — `cv_analys_api/requirements.txt`

| Package | Version |
|---|---|
| flask | 3.1.3 |
| tensorflow-cpu | 2.20.0 |
| paddleocr | 2.7.3 |
| PyMuPDF | 1.27.2.3 |

---

## Supporting Config Files

| File | Description |
|---|---|
| `.gitignore` | Excludes `node_modules`, `dist`, logs, and editor files |
| `vite.config.js` | Vite build configuration |
| `eslint.config.js` | ESLint rules |
| `backend/.env` | Database credentials and JWT secret (not committed) |

---

## ML Model Download

Download model files from **[Google Drive](https://drive.google.com/your-link-here)** and place them as follows:

> Access has been granted to `capstone@student.devacademy.id`.

```
ml_api/models/
├── skill_recommender_v1.keras
├── mlb_fix.pkl
├── tfidf_vec.pkl
└── vectorizer_fix.pkl

cv_analys_api/artifacts/
├── skill_recommender_v1.h5
├── mlb_fix.pkl
└── vectorizer_fix.pkl
```

---

## Environment Setup

**Requirements:** Node.js v18+, Python 3.11, PostgreSQL, Git

### 1. Database
```bash
psql -U your_user -d your_database -f backend/schema.sql
psql -U your_user -d your_database -f backend/schema_tambahan.sql
```

### 2. Backend
```bash
cd backend && npm install
```
Create `backend/.env`:
```env
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
JWT_SECRET=your_secret
PORT=5000
```
```bash
npm run start:dev  # http://localhost:5000
```

### 3. ML API
```bash
cd ml_api
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python app.py  # http://localhost:5001
```

### 4. CV Analyzer API
```bash
cd cv_analys_api
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python app.py  # http://localhost:5002
```

### 5. Frontend
```bash
npm install && npm run dev  # http://localhost:5173
```

---

## Running the App

1. Open `http://localhost:5173`
2. Register and log in
3. **Job Search** — browse job listings
4. **Job Prediction** — paste a job description to get skill recommendations
5. **Dashboard** — upload your CV for skill gap analysis
6. **AI Assistant** — chat for career advice

---

## Troubleshooting

- **ML API won't start** — verify all model files exist in `ml_api/models/`
- **CV Analyzer won't start** — use Python 3.11 and check `cv_analys_api/artifacts/`
- **Frontend can't reach backend** — ensure backend is on port 5000 with correct `.env`
- **CORS errors** — backend must allow requests from `http://localhost:5173`

---

Capstone Team CC26-PSU129 — MIT License
