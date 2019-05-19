import React, { Component } from 'react';
import { Input, Form, Button } from 'antd';
import 'antd/dist/antd.css';
import '../App.css';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CompanyNameForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const companyNameError = isFieldTouched('companyName') && getFieldError('companyName');
    return (
      <Form className="client-form" layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item className="client-input" validateStatus={companyNameError ? 'error' : ''} help={companyNameError || ''}>
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: "Please input the client's name" }],
          })(
            <Input
              placeholder="Client name"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button className="submit-btn" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Generate
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedCompanyNameForm = Form.create({ name: 'company_name' })(CompanyNameForm);

export default WrappedCompanyNameForm;