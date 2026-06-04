// In-memory profile storage
let profiles = {
  'Guest': {
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 234 567 890',
    address: 'Jakarta, Indonesia',
    summary: 'A passionate professional looking for new challenges.',
    photo: '',
    skills: ['React', 'JavaScript', 'Node.js', 'CSS'],
    experience: [
      { id: 1, role: 'Frontend Developer', company: 'Tech Corp', period: '2021 - Present', description: 'Developing scalable web applications.' }
    ]
  }
};

const getProfileForUser = (username) => {
  if (!username) return profiles['Guest'];
  if (!profiles[username]) {
    profiles[username] = {
      name: '', title: '', email: '', phone: '', address: '', summary: '', photo: '', skills: [], experience: []
    };
  }
  return profiles[username];
};

// @desc    Get user profile
// @route   GET /api/profiles/:username
// @access  Public
export const getProfile = (req, res) => {
  const username = req.params.username;
  res.json(getProfileForUser(username));
};

// @desc    Update user profile
// @route   PUT /api/profiles/:username
// @access  Public
export const updateProfile = (req, res) => {
  const username = req.params.username;
  const { name, title, email, phone, address, summary, photo, skills, experience } = req.body;
  
  const userProfile = getProfileForUser(username);

  if (name !== undefined) userProfile.name = name;
  if (title !== undefined) userProfile.title = title;
  if (email !== undefined) userProfile.email = email;
  if (phone !== undefined) userProfile.phone = phone;
  if (address !== undefined) userProfile.address = address;
  if (summary !== undefined) userProfile.summary = summary;
  if (photo !== undefined) userProfile.photo = photo;
  if (skills !== undefined) userProfile.skills = skills;
  if (experience !== undefined) userProfile.experience = experience;

  res.json({
    message: 'Profile updated successfully',
    profile: userProfile
  });
};
