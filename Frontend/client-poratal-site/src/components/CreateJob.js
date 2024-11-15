import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

const CreateJobPage = (jobData) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
         const token  = localStorage.getItem('token');
         if (!token) {
          console.error('No token found');
          return;
        }
        const response  = await axios.post('http://localhost:4000/api/createjobs',jobData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },});    
          console.log('Job created successfully:', response.data);
    } catch (error) {
      message.error('Failed to create job');
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-container" style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Create a Job</h2>
      <Form name="create-job" onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="title"
          label="Job Title"
          rules={[{ required: true, message: 'Please enter the job title' }]}
        >
          <Input placeholder="Enter job title" />
        </Form.Item>

        <Form.Item
          name="company"
          label="Company Name"
          rules={[{ required: true, message: 'Please enter the company name' }]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter the job location' }]}
        >
          <Input placeholder="Enter job location" />
        </Form.Item>

        <Form.Item
          name="salary"
          label="Salary"
          rules={[{ required: true, message: 'Please enter the salary' }]}
        >
          <Input placeholder="Enter salary" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Job Description"
          rules={[{ required: true, message: 'Please enter the job description' }]}
        >
          <Input.TextArea placeholder="Enter job description" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create Job
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateJobPage;
