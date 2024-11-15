import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';


const CreateJobPage = (jobData) => {
  const [form] =  Form.useForm();
  const [loading , setLoading]= useState(false);
  
  const handleSubmit =  async(values)=>{
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('You are not authenticated');
      setLoading(false);
      return;
    }
    try {
        const response = await axios.post('http://localhost:4000/api/createjobs', values , {
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          message.success('Job created successfully');
          form.resetFields();
        }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error creating job');
    }
  }
  return (
    <div className="create-job-form">
      <h2>Create New Job</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: '',
          description: '',
          location: '',
          salary: '',
          companyName: '',
        }}
      >
        <Form.Item
          label="Job Title"
          name="title"
          rules={[{ required: true, message: 'Please input the job title!' }]}
        >
          <Input placeholder="Enter job title" />
        </Form.Item>

        <Form.Item
          label="Job Description"
          name="description"
          rules={[{ required: true, message: 'Please input the job description!' }]}
        >
          <Input.TextArea placeholder="Enter job description" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please input the job location!' }]}
        >
          <Input placeholder="Enter job location" />
        </Form.Item>

        <Form.Item
          label="Salary"
          name="salary"
          rules={[{ required: true, message: 'Please input the salary!' }]}
        >
          <Input placeholder="Enter salary" />
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: 'Please input the company name!' }]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
        >
          Create Job
        </Button>
      </Form>
    </div>
  );
};

export default CreateJobPage;
