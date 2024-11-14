import React from 'react';
import { Layout, Menu } from 'antd';
import { ProfileOutlined, SearchOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import '../components/cssFile/dashboard.css'; 

const { Header, Content, Footer } = Layout;

const JobSeekerDashboard = () => {
  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '24px' }}>Job Seeker Dashboard</div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" icon={<SearchOutlined />}>
            <Link to="/search-jobs">Search Jobs</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileDoneOutlined />}>
            <Link to="/applications">My Applications</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div className="dashboard-content">
          {/* Add content here, such as job recommendations, application status, etc. */}
          <h2>Welcome to Your Dashboard!</h2>
          <p>Explore jobs, manage your applications, and update your profile.</p>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Job Portal ©2024</Footer>
    </Layout>
  );
};

export default JobSeekerDashboard;
