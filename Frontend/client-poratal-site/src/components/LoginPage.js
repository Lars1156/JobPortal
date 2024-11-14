import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/reset.css';

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false); 
  const history = useNavigate(); 

  const onFinish = async (values) => {
    console.log('Received values:', values);
    setLoading(true); // Start loading

    try {
      // Construct payload as required by the backend
      const payload = {
        auth: {
          username: values.username,
          password: values.password,
        }
      };

      // Make API call to login
      const response = await axios.post('/api/login', payload);

      // Handle the response if login is successful
      console.log('Login successful:', response);
      
      // Store the token (if applicable)
      localStorage.setItem('token', response.data.token); // Adjust as needed based on your API response
      message.success('Login successful!'); // Show success message

      // Redirect to dashboard or home page
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ maxWidth: 400, width: '100%', padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Typography.Text>Don't have an account?</Typography.Text>
          <Link to="/register">
            <Button type="link">Register Here</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
