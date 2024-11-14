import React from 'react';
import { Layout, Typography, Space } from 'antd';

const { Footer } = Layout;
const { Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center', padding: '20px 50px' }}>
      <Space direction="vertical" style={{ textAlign: 'center' }}>
        <Text style={{ color: '#fff' }}>© {new Date().getFullYear()} Job Application Portal. All Rights Reserved.</Text>
        <Space>
          <Link href="/about" style={{ color: '#fff' }}>About Us</Link>
          <Link href="/contact" style={{ color: '#fff' }}>Contact</Link>
          <Link href="/privacy" style={{ color: '#fff' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#fff' }}>Terms of Service</Link>
        </Space>
      </Space>
    </Footer>
  );
};

export default AppFooter;
