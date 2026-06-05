import { useState, useEffect } from 'react';

export function useSavedJobs(username) {
  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem(`savedJobs_${username}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`savedJobs_${username}`, JSON.stringify(savedJobIds));
  }, [savedJobIds, username]);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  return { savedJobIds, toggleSaveJob, isJobSaved };
}
