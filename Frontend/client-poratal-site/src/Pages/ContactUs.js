import React from 'react';
import { Form, Input, Button, Card, Typography, Layout } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
    // Add logic to send the form data to the backend or process it as needed
  };

  return (
    <Layout style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <Content style={{ margin: '0 auto', maxWidth: '600px' }}>
        <Card>
          <Title level={2} style={{ textAlign: 'center' }}>Contact Us</Title>
          <Paragraph style={{ textAlign: 'center', marginBottom: '20px' }}>
            We would love to hear from you! Please fill out the form below, and our team will get back to you as soon as possible.
          </Paragraph>
          <Form
            name="contact_form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>

            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please enter a subject' }]}
            >
              <Input placeholder="Subject" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea rows={4} placeholder="Your Message" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default ContactUs;
