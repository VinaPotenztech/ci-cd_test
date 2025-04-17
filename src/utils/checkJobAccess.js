import Job from '../models/jobs.model.js';

export async function ifHasAccess(id, req) {
  try {
    const job = await Job.findById(id);
    if (!job) {
      return false; // Job not found, return false
    }

    const employerId = job.user_id;
    console.log('employerId:', employerId);
    console.log('req.id:', req.id);

    // Check if the requesting user is the employer who created the job
    if (employerId.toString() !== req.id) {
      // Ensure types match
      return false; // Access denied, return false
    }

    return true; // User has access
  } catch (error) {
    console.error('Error checking access:', error);
    return false; // Return false on error to prevent execution
  }
}
