import pool from '../config/db.js';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Public
export const createJob = async (req, res) => {
  try {
    const {
      company, logo, title, applicants, tags, salary, posted, 
      desc, matchScore, location, experience, type, level, 
      deadline, responsibilities, requirements, benefits
    } = req.body;

    const result = await pool.query(
      `INSERT INTO jobs 
      (company, logo, title, applicants, tags, salary, posted, "desc", matchScore, location, experience, type, level, deadline, responsibilities, requirements, benefits) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [company, logo, title, applicants, tags, salary, posted, desc, matchScore, location, experience, type, level, deadline, responsibilities, requirements, benefits]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Public
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      company, logo, title, applicants, tags, salary, posted, 
      desc, matchScore, location, experience, type, level, 
      deadline, responsibilities, requirements, benefits
    } = req.body;

    // Check if job exists
    const checkJob = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (checkJob.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Keep existing values for missing fields from req.body (or just do full replacement)
    // Here we'll do a simple update for all fields provided in body (assuming body provides all fields if updating)
    // Or we could build a dynamic query. For simplicity, we just update the specific fields we care about or all fields.
    const result = await pool.query(
      `UPDATE jobs SET 
        company = COALESCE($1, company),
        logo = COALESCE($2, logo),
        title = COALESCE($3, title),
        applicants = COALESCE($4, applicants),
        tags = COALESCE($5, tags),
        salary = COALESCE($6, salary),
        posted = COALESCE($7, posted),
        "desc" = COALESCE($8, "desc"),
        matchScore = COALESCE($9, matchScore),
        location = COALESCE($10, location),
        experience = COALESCE($11, experience),
        type = COALESCE($12, type),
        level = COALESCE($13, level),
        deadline = COALESCE($14, deadline),
        responsibilities = COALESCE($15, responsibilities),
        requirements = COALESCE($16, requirements),
        benefits = COALESCE($17, benefits)
      WHERE id = $18 RETURNING *`,
      [company, logo, title, applicants, tags, salary, posted, desc, matchScore, location, experience, type, level, deadline, responsibilities, requirements, benefits, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Public
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
