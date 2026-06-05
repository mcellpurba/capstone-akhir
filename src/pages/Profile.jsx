import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { useTheme } from "../context/ThemeContext";

function Profile() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    photo: '',
    skills: [],
    experience: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [currentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : { username: 'Guest' };
  });

  const getLocalProfileKey = () => `userProfile_${currentUser.username}`;

  // Fetch profile from API on component mount
  useEffect(() => {
    const loadFromLocal = () => {
      try {
        const saved = localStorage.getItem(getLocalProfileKey());
        if (saved) setProfile(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.warn('Could not parse local storage profile', e);
      }
    };

      const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profiles/${currentUser.username}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(prev => ({ ...prev, ...data }));
        } else {
          loadFromLocal();
        }
      } catch {
        // Fallback to local storage silently if API fails
        loadFromLocal();
      }
    };

    fetchProfile();
  }, []);

  const [newSkill, setNewSkill] = useState('');
  const [isEditingMode, setIsEditingMode] = useState(true);

  // Experience form state
  const [expForm, setExpForm] = useState({ role: '', company: '', period: '', description: '' });

  const saveProfile = (newProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(getLocalProfileKey(), JSON.stringify(newProfile));
    } catch (e) {
      console.warn('Could not save to localStorage. It might be full.', e);
    }
  };

  const handleSaveToApi = async () => {
    setIsLoading(true);
    setSaveMessage('');
    try {
      const response = await fetch(`http://localhost:5000/api/profiles/${currentUser.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...profile, username: currentUser.username }),
      });
      
      if (response.ok) {
        setSaveMessage('Profile saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to save profile.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage('Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    saveProfile({ ...profile, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200; // Ukuran maksimal foto
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Kompres ke JPEG dengan kualitas 70% agar base64 sangat pendek
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          saveProfile({ ...profile, photo: compressedBase64 });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    const currentSkills = profile.skills || [];
    if (newSkill.trim() && !currentSkills.includes(newSkill)) {
      saveProfile({ ...profile, skills: [...currentSkills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    const currentSkills = profile.skills || [];
    saveProfile({ ...profile, skills: currentSkills.filter(s => s !== skillToRemove) });
  };

  const addExperience = () => {
    if (expForm.role && expForm.company) {
      const newExp = { ...expForm, id: Date.now() };
      const currentExp = profile.experience || [];
      saveProfile({ ...profile, experience: [...currentExp, newExp] });
      setExpForm({ role: '', company: '', period: '', description: '' });
    }
  };

  const removeExperience = (id) => {
    const currentExp = profile.experience || [];
    saveProfile({ ...profile, experience: currentExp.filter(exp => exp.id !== id) });
  };

  const handlePrint = () => {
    setIsEditingMode(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="dash-container profile-page">
      {/* Sidebar - Hide on Print */}
      <aside className="dash-sidebar no-print">
        <div className="dash-logo">
          <div className="logo-icon">M</div>
          <div>
            <h2>MyJobTrend</h2>
            <p>Free Plan</p>
          </div>
        </div>

        <div className="dash-menu-group">
          <p className="menu-label">MAIN MENU</p>
          <Link to="/dashboard" className="menu-item"><span>🏠</span> Dashboard</Link>
          <Link to="/search" className="menu-item"><span>💼</span> Job Search</Link>
        </div>

        <div className="dash-menu-group">
          <p className="menu-label">Job Trend</p>
          <Link to="/prediction" className="menu-item"><span>⚙️</span> Job Prediction</Link>
          <Link to="/chatbot" className="menu-item"><span>🤖</span> AI Chatbot</Link>
          <Link to="/profile" className="menu-item active"><span>👤</span> Profile</Link>
          <button className="menu-item" onClick={handleLogout} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#ef4444', font: 'inherit', marginTop: 'auto' }}>
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-header no-print">
          <h1>My Profile ✨</h1>
          <div className="header-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme" style={{ marginRight: '10px' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {isEditingMode && (
              <button 
                className="btn-primary" 
                style={{ backgroundColor: '#10b981', borderColor: '#10b981' }} 
                onClick={handleSaveToApi} 
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : '💾 Save Profile'}
              </button>
            )}
            <button className="btn-outline" onClick={() => setIsEditingMode(!isEditingMode)}>
              {isEditingMode ? 'Preview CV' : 'Edit Profile'}
            </button>
            <button className="btn-primary" onClick={handlePrint}>🖨️ Download / Print CV</button>
          </div>
        </header>

        {saveMessage && (
          <div style={{ padding: '10px', backgroundColor: saveMessage.includes('Error') || saveMessage.includes('Failed') ? '#ef4444' : '#10b981', color: 'white', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
            {saveMessage}
          </div>
        )}

        {isEditingMode ? (
          <div className="profile-edit-grid no-print">
            <div className="profile-card">
              <h3>Personal Information</h3>
              <div className="form-group-photo">
                <div className="photo-preview">
                  {profile.photo ? <img src={profile.photo} alt="Profile" /> : <div className="photo-placeholder">No Photo</div>}
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="photo-input" />
              </div>
              
              <div className="form-grid">
                <input type="text" name="name" placeholder="Full Name" value={profile.name || ''} onChange={handleInputChange} />
                <input type="text" name="title" placeholder="Professional Title" value={profile.title || ''} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={profile.email || ''} onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone Number" value={profile.phone || ''} onChange={handleInputChange} />
                <input type="text" name="address" placeholder="Address" value={profile.address || ''} onChange={handleInputChange} style={{ gridColumn: '1 / -1' }} />
                <textarea name="summary" placeholder="Professional Summary" value={profile.summary || ''} onChange={handleInputChange} rows="4" style={{ gridColumn: '1 / -1' }}></textarea>
              </div>
            </div>

            <div className="profile-card">
              <h3>Skills</h3>
              <div className="skill-input-group">
                <input type="text" placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill()} />
                <button onClick={addSkill} className="btn-primary">Add</button>
              </div>
              <div className="jc-tags" style={{ marginTop: '15px' }}>
                {(profile.skills || []).map((skill, idx) => (
                  <span key={idx} className="tag-dark skill-tag">
                    {skill} <button className="remove-tag" onClick={() => removeSkill(skill)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-card">
              <h3>Work Experience</h3>
              <div className="exp-input-group">
                <input type="text" placeholder="Role (e.g. Frontend Developer)" value={expForm.role} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} />
                <input type="text" placeholder="Company Name" value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} />
                <input type="text" placeholder="Period (e.g. 2020 - 2022)" value={expForm.period} onChange={(e) => setExpForm({ ...expForm, period: e.target.value })} />
                <textarea placeholder="Job Description" value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} rows="3"></textarea>
                <button onClick={addExperience} className="btn-primary" style={{ width: 'fit-content' }}>Add Experience</button>
              </div>

              <div className="exp-list">
                {(profile.experience || []).map(exp => (
                  <div key={exp.id} className="exp-item">
                    <div>
                      <h4>{exp.role} at {exp.company}</h4>
                      <p className="exp-period">{exp.period}</p>
                      <p>{exp.description}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeExperience(exp.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* CV PREVIEW / PRINT AREA */}
        <div className={`cv-preview-container ${isEditingMode ? 'hidden-in-edit' : ''}`}>
          <div className="cv-document">
            <header className="cv-header">
              <div className="cv-header-text">
                <h1>{profile.name}</h1>
                <h2>{profile.title}</h2>
                <div className="cv-contact">
                  <span>✉ {profile.email}</span>
                  <span>☎ {profile.phone}</span>
                  <span>📍 {profile.address}</span>
                </div>
              </div>
              {profile.photo && (
                <div className="cv-photo">
                  <img src={profile.photo} alt={profile.name} />
                </div>
              )}
            </header>

            <section className="cv-section">
              <h3>Professional Summary</h3>
              <p>{profile.summary}</p>
            </section>

            <section className="cv-section">
              <h3>Skills</h3>
              <div className="cv-skills">
                {(profile.skills || []).map((skill, i) => <span key={i} className="cv-skill-tag">{skill}</span>)}
              </div>
            </section>

            <section className="cv-section">
              <h3>Work Experience</h3>
              <div className="cv-experience-list">
                {(profile.experience || []).map(exp => (
                  <div key={exp.id} className="cv-exp-item">
                    <div className="cv-exp-header">
                      <h4>{exp.role}</h4>
                      <span className="cv-exp-period">{exp.period}</span>
                    </div>
                    <div className="cv-exp-company">{exp.company}</div>
                    <p className="cv-exp-desc">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;