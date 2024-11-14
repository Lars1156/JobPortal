import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send the registration data to the backend API
      const response = await axios.post("http://localhost:4000/api/registerUser", {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      // Show a success notification
      notification.success({
        message: 'Registration Successful',
        description: response.data.message,
      });

      // After registration success, navigate to the login page
      navigate('/login'); 

    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}  // Handle form submission
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select your role!' }]}
        >
          <Input placeholder="Enter your role (e.g., job-seeker, employer)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
