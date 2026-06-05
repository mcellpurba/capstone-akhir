import re

KEYWORDS = [
    "Back End Developer", "Front End Developer", "FullStack Developer", "Web Developer",
    "Android Developer", "iOS Developer", "Mobile Developer", "Flutter Developer",
    "React Native Developer", "Golang Developer", "Java Developer", "PHP Developer",
    "Python Developer", "NodeJS Developer", ".NET Developer",
    
    "QA Automation Engineer", "QA Manual-Tester", "Software Quality Assurance", "QA Analyst",
    
    "Data Analyst", "Data Engineer", "Data Scientist", "Business Intelligence Analyst",
    "Database Administrator", "ERP Consultant", "SAP Consultant", "Salesforce Developer",
    
    "DevOps Engineer", "Cloud Engineer", "System Administrator", "Network Engineer",
    "IT Infrastructure Engineer", "System Engineer", "Linux Administrator",
    
    "Cyber Security Analyst", "Information Security Engineer", "Penetration Tester",
    "IT Security Officer",
    
    "UI/UX Designer", "Product Manager", "Product Owner", "Scrum Master",
    "IT Business Analyst", "System Analyst", "IT Project Manager",
    
    "IT-Support Staff", "Technical Support-Engineer", "Helpdesk IT", "Application Support",
    "IT Network-Support", "IT Operations",
    
    "Unity Developer", "Unreal Engine-Developer", "Game Programmer", "Game Artist",
    "Game Designer"
]

KEYWORD_TO_CANONICAL = {
    "Back End Developer": "backend developer",
    "Front End Developer": "frontend developer",
    "FullStack Developer": "fullstack developer",
    "Web Developer": "fullstack developer",
    "Android Developer": "mobile developer",
    "iOS Developer": "mobile developer",
    "Mobile Developer": "mobile developer",
    "Flutter Developer": "mobile developer",
    "React Native Developer": "mobile developer",
    "Golang Developer": "golang developer",
    "Java Developer": "java developer",
    "PHP Developer": "php developer",
    "Python Developer": "python developer",
    "NodeJS Developer": "nodejs developer",
    ".NET Developer": "dotnet developer",
    "QA Automation Engineer": "qa engineer",
    "QA Manual-Tester": "qa engineer",
    "Software Quality Assurance": "qa engineer",
    "QA Analyst": "qa engineer",
    "Data Analyst": "data analyst",
    "Data Engineer": "data engineer",
    "Data Scientist": "data scientist",
    "Business Intelligence Analyst": "data analyst",
    "Database Administrator": "database administrator",
    "ERP Consultant": "erp consultant",
    "SAP Consultant": "erp consultant",
    "Salesforce Developer": "software developer",
    "DevOps Engineer": "devops engineer",
    "Cloud Engineer": "cloud engineer",
    "System Administrator": "system administrator",
    "Network Engineer": "network engineer",
    "IT Infrastructure Engineer": "system administrator",
    "System Engineer": "software developer",
    "Linux Administrator": "system administrator",
    "Cyber Security Analyst": "security engineer",
    "Information Security Engineer": "security engineer",
    "Penetration Tester": "security engineer",
    "IT Security Officer": "security engineer",
    "UI/UX Designer": "ui/ux designer",
    "Product Manager": "product manager",
    "Product Owner": "product manager",
    "Scrum Master": "scrum master",
    "IT Business Analyst": "it business analyst",
    "System Analyst": "system analyst",
    "IT Project Manager": "it project manager",
    "IT-Support Staff": "it support",
    "Technical Support-Engineer": "it support",
    "Helpdesk IT": "it support",
    "Application Support": "it support",
    "IT Network-Support": "it support",
    "IT Operations": "it support",
    "Unity Developer": "game developer",
    "Unreal Engine-Developer": "game developer",
    "Game Programmer": "game developer",
    "Game Artist": "game developer",
    "Game Designer": "game developer"
}

def normalize_job(title: str) -> str:
    if not title:
        return None
    t = title.lower().strip()
    
    # Game Industry
    if re.search(r"unity", t): return "Unity Developer"
    if re.search(r"unreal", t): return "Unreal Engine-Developer"
    if re.search(r"game.*art", t): return "Game Artist"
    if re.search(r"game.*des", t): return "Game Designer"
    if re.search(r"game.*prog|game.*dev|game.*play", t): return "Game Programmer"
    
    # Software Development / Engineering
    if re.search(r"back.?end|backend", t): return "Back End Developer"
    if re.search(r"front.?end|frontend", t): return "Front End Developer"
    if re.search(r"full.?stack|fullstack", t): return "FullStack Developer"
    if re.search(r"flutter", t): return "Flutter Developer"
    if re.search(r"react.*native", t): return "React Native Developer"
    if re.search(r"android", t): return "Android Developer"
    if re.search(r"ios\b", t): return "iOS Developer"
    if re.search(r"mobile", t): return "Mobile Developer"
    if re.search(r"golang|\bgo\b.*dev|\bgo\b.*developer", t): return "Golang Developer"
    if re.search(r"java\b", t): return "Java Developer"
    if re.search(r"php", t): return "PHP Developer"
    if re.search(r"python", t): return "Python Developer"
    if re.search(r"node", t): return "NodeJS Developer"
    if re.search(r"\.net|c#", t): return ".NET Developer"
    
    # Quality Assurance (QA)
    if re.search(r"qa.*auto|auto.*qa|auto.*test", t): return "QA Automation Engineer"
    if re.search(r"qa.*manual|manual.*qa|manual.*test", t): return "QA Manual-Tester"
    if re.search(r"quality assurance|sqa", t): return "Software Quality Assurance"
    if re.search(r"qa.*analyst|\bqa\b|tester|test.*eng", t): return "QA Analyst"
    
    # Data & Enterprise
    if re.search(r"data.*scien", t): return "Data Scientist"
    if re.search(r"data.*engin", t): return "Data Engineer"
    if re.search(r"bi\b|business.*intel", t): return "Business Intelligence Analyst"
    if re.search(r"data.*analy", t): return "Data Analyst"
    if re.search(r"database.*admin|\bdba\b", t): return "Database Administrator"
    if re.search(r"sap\b", t): return "SAP Consultant"
    if re.search(r"erp", t): return "ERP Consultant"
    if re.search(r"salesforce", t): return "Salesforce Developer"
    
    # Security
    if re.search(r"cyber.*sec|security.*analyst", t): return "Cyber Security Analyst"
    if re.search(r"info.*sec|information.*security", t): return "Information Security Engineer"
    if re.search(r"penetration|pentest|hacker", t): return "Penetration Tester"
    if re.search(r"security.*officer", t): return "IT Security Officer"
    
    # Infrastructure, Cloud & Networking
    if re.search(r"devops|dev.*ops|site reliability|\bsre\b", t): return "DevOps Engineer"
    if re.search(r"cloud", t): return "Cloud Engineer"
    if re.search(r"linux", t): return "Linux Administrator"
    if re.search(r"sys.*admin|system.*admin", t): return "System Administrator"
    if re.search(r"network.*eng", t): return "Network Engineer"
    if re.search(r"infra", t): return "IT Infrastructure Engineer"
    if re.search(r"system.*eng", t): return "System Engineer"
    
    # Design & Product Management
    if re.search(r"ui.?ux|ux.*designer|ui.*designer", t): return "UI/UX Designer"
    if re.search(r"product.*owner", t): return "Product Owner"
    if re.search(r"product.*man", t): return "Product Manager"
    if re.search(r"scrum", t): return "Scrum Master"
    if re.search(r"it.*business|business.*analyst", t): return "IT Business Analyst"
    if re.search(r"system.*analyst", t): return "System Analyst"
    if re.search(r"project.*man", t): return "IT Project Manager"
    
    # Support & Operations
    if re.search(r"helpdesk", t): return "Helpdesk IT"
    if re.search(r"app.*support", t): return "Application Support"
    if re.search(r"network.*support", t): return "IT Network-Support"
    if re.search(r"technical.*support", t): return "Technical Support-Engineer"
    if re.search(r"it.*op|operations", t): return "IT Operations"
    if re.search(r"support|help.*desk", t): return "IT-Support Staff"
    
    # Software Developer/Web Developer fallback
    if re.search(r"web.*dev|web.*prog", t): return "Web Developer"
    if re.search(r"prog|dev|eng|soft", t): return "FullStack Developer"  # default fallback if it looks like software developer
    
    return None

def is_valid_job(title: str) -> bool:
    return normalize_job(title) is not None