"use client"


import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

interface FraudCaseData {
  nature: string;
  transactionDetails: string;
  supportingDocs: File[]; 
}

const ReportFraud: React.FC = () => {
  const [formData, setFormData] = useState<FraudCaseData>({
    nature: '',
    transactionDetails: '',
    supportingDocs: [],
  });

  const handleChange = (field: keyof FraudCaseData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/report-fraud', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.success) {
      // Show success message and clear form
      alert('Fraud case reported successfully!');
      setFormData({ nature: '', transactionDetails: '', supportingDocs: [] });
    } else {
      alert('Error reporting fraud case.');
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Nature of Fraud">
        <Input value={formData.nature} onChange={(e) => handleChange('nature', e.target.value)} />
      </Form.Item>
      <Form.Item label="Transaction Details">
        <Input.TextArea value={formData.transactionDetails} onChange={(e) => handleChange('transactionDetails', e.target.value)} />
      </Form.Item>
      <Form.Item label="Supporting Documents">
        <Input type="file" multiple onChange={(e) => handleChange('supportingDocs', e.target.files)} />
      </Form.Item>
      <Button type="primary" htmlType="submit" >Report Fraud</Button>
    </Form>
  );
};

export default ReportFraud;
