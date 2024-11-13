import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css';

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle login logic here
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
            <Button type="primary" htmlType="submit" block>
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
