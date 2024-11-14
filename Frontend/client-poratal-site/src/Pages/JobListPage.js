import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, message } from 'antd';
import '../components/cssFile/jobs.css'; 

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getAlljobs');
        setJobs(response.data.jobs); 
      } catch (error) {
        message.error('Failed to fetch jobs');
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="jobs-container">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <Card key={job._id} title={job.title} style={{ margin: '20px' }}>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <Button type="primary">Apply</Button>
          </Card>
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default AllJobsPage;
