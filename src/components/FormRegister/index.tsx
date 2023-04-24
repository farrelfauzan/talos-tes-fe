/* eslint-disable prefer-regex-literals */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { RegisterApi } from '@/services/auth.service';

type IPassword = {
  target: {
    value: string;
  };
};

export const FormRegister = () => {
  const router = useRouter();
  const [RegisterForm] = Form.useForm();
  const [password, setPassword] = useState<string>('');
  const onFinish = () => {
    RegisterForm.validateFields().then((val) => {
      if (val.password === password) {
        const payload = {
          email: val.email,
          firstName: val.firstName,
          lastName: val.lastName,
          password: val.password,
        };
        RegisterApi(payload, router);
      } else {
        message.error('Password did not match');
      }
    });
  };
  const onChangeConfirm = (e: IPassword) => {
    setPassword(e.target.value);
  };
  return (
    <div className="m-auto flex h-screen flex-col items-center justify-center">
      <div className="p-8 text-center text-2xl font-semibold">
        Welcome to our <br /> Data Platform
      </div>
      <Form
        form={RegisterForm}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: 'The input is not a valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: 'Please input password',
            },
            {
              pattern: new RegExp(/^(?=.{8,}$).*/),
              message: 'Password must have 8 character or more',
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          required={false}
          rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password not match!'));
              },
            }),
          ]}
        >
          <Input.Password size="large" onChange={(e) => onChangeConfirm(e)} />
        </Form.Item>
        <div className="flex w-full justify-center">
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="flex items-center bg-gray-600"
            >
              Register
            </Button>
          </Form.Item>
        </div>
        <div className="flex flex-row justify-between">
          <div>{`Already have an acoount?`}</div>
          <div
            onClick={() => router.push('/auth/login')}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Log in
          </div>
        </div>
      </Form>
    </div>
  );
};
