import React from 'react';
import { Typography, Layout } from 'antd';
import AppFooter from './AppFooter';
import ContactUs from './ContactUs';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <>
    <Layout style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <Content style={{ margin: '0 auto', maxWidth: '800px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Welcome to the Job Application Portal</Title>
        <Paragraph>
          Our job portal is designed to connect talented job seekers with leading employers. Explore job opportunities, 
          apply for positions, and take the next step in your career journey. Whether you are looking to submit your resume, 
          track your applications, or reach out to potential employers, we have all the tools you need.
        </Paragraph>
        <Paragraph>
          Start by browsing the latest job postings or create an account to manage your applications and receive personalized 
          job recommendations.
        </Paragraph>
      </Content>
    </Layout>
    <ContactUs/>
    <AppFooter/>

    </>
  );
};

export default HomePage;
