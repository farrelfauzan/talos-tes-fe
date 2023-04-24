/* eslint-disable import/no-extraneous-dependencies */

import { message } from 'antd';
import { deleteCookie, setCookie } from 'cookies-next';

import httpAuth from '@/http/http.auth';

export const LoginApi = async (payload: any, navigate: any) => {
  const mutation = `
    mutation login($email: String!, $password: String!) {
      login(loginUserInput: {
        email: $email,
        password: $password
      }) {
        user {
          email
          firstName
          lastName
        }
        access_token
      }
    }
  `;
  try {
    const data: any = await httpAuth.post('', {
      query: mutation,
      variables: {
        email: payload.email,
        password: payload.password,
      },
    });
    setCookie('USER_TOKEN_DATA_PLATFORM', data.data.login.access_token);
    navigate.push('/data/management');
  } catch (error) {
    message.error('Invalid Credential');
  }
};

export const RegisterApi = async (payload: any, navigate: any) => {
  const mutation = `
  mutation signup($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    signup(createUserInput: {
      email: $email,
      firstName: $firstName,
      lastName: $lastName,
      password: $password
    }) {
      success
      status
      email
      firstName
      lastName
    }
  }
`;
  try {
    const data: any = await httpAuth.post('', {
      query: mutation,
      variables: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
      },
    });
    console.log(data);
    if (data.errors) {
      message.error('Invalid Email');
    } else {
      navigate.push('/auth/login');
    }
  } catch (error) {
    console.log(error);
    message.error('Invalid Credential');
  }
};

export const LogoutApi = (navigate: any) => {
  deleteCookie('USER_TOKEN_DATA_PLATFORM');
  navigate.push('/auth/login');
};
