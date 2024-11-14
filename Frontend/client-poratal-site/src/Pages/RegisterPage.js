import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // API call to register user
      const response = await axios.post('/api/users/register', values);
      message.success('Registration successful');
      console.log(response.data);
    } catch (error) {
      message.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select your role' }]}
        >
          <Select placeholder="Select your role">
            <Option value="employer">Employer</Option>
            <Option value="job-seeker">Job Seeker</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
