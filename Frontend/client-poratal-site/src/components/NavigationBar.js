import React from 'react';
import { Menu, Button, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const JobPortalNavBar = () => {
  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001529' }}>
        <div style={{ color: '#fff', fontSize: '24px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Job Portal</Link>
        </div>
        <Menu mode="horizontal" theme="dark" style={{ flexGrow: 1 }}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="jobs">
            <Link to="/jobs">Jobs</Link>
          </Menu.Item>
          <Menu.Item key="apply">
            <Link to="/apply">Apply</Link>
          </Menu.Item>
          <Menu.Item key="resume">
            <Link to="/resume">Submit Resume</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/contact">Contact Us</Link>
          </Menu.Item>
        </Menu>
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
      </Header>
    </Layout>
  );
};

export default JobPortalNavBar;
