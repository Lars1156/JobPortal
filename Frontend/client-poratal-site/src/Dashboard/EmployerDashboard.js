import React, { useState } from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { UserOutlined, AppstoreAddOutlined, FileSearchOutlined } from '@ant-design/icons';
// import CreateJobPage from './CreateJobPage';  
import CreateJob from '../components/CreateJob';
import AppFooter from '../Pages/AppFooter'
// import JobApplicationsPage from './JobApplicationsPage';

const { Header, Content, Sider } = Layout;

const EmployerDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('create-job'); 

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <>
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header className="header" style={{ padding: 0 }}>
        <div style={{ color: 'black', fontSize: '20px', textAlign: 'center' , background:'white' }}>Employer Dashboard</div>
      </Header>

      {/* Layout with horizontal Sider for navigation */}
      <Layout>
        {/* Sider: Horizontal Navigation Bar */}
        <Sider width={200} style={{ background: '#fff', paddingTop: '20px' }}>
          <Menu
            mode="vertical"
            selectedKeys={[selectedMenu]}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="create-job" icon={<AppstoreAddOutlined />}>
              Create Job
            </Menu.Item>
            <Menu.Item key="view-applications" icon={<FileSearchOutlined />}>
              View Job Applications
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {selectedMenu === 'create-job' && <CreateJob />}
            {/* {selectedMenu === 'view-applications' && <JobApplicationsPage />} */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <div>
         <AppFooter/>
    </div>
    </>
  );
};

export default EmployerDashboard;
