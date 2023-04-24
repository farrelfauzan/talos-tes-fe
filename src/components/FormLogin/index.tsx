/* eslint-disable import/no-extraneous-dependencies */
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';

import { LoginApi } from '@/services/auth.service';

export const FormLogin = () => {
  const router = useRouter();
  const [LoginForm] = Form.useForm();
  const onFinish = () => {
    LoginForm.validateFields().then((val) => {
      const payload = {
        email: val.email,
        password: val.password,
      };
      LoginApi(payload, router);
    });
  };
  return (
    <div className="m-auto flex h-screen flex-col items-center justify-center">
      <div className="p-8 text-center text-2xl font-semibold">
        Welcome to our <br /> User Management
      </div>
      <Form
        form={LoginForm}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <div className="flex w-full justify-center">
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="flex items-center bg-gray-600"
            >
              Login
            </Button>
          </Form.Item>
        </div>
        <div className="flex flex-row justify-between">
          <div>{`Don't have any acoount?`}</div>
          <div
            onClick={() => router.push('/auth/register')}
            className="cursor-pointer pl-3 text-blue-300 hover:underline"
          >
            Register
          </div>
        </div>
      </Form>
    </div>
  );
};
