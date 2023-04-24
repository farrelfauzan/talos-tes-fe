/* eslint-disable import/no-extraneous-dependencies */

import httpUsers from '@/http/http.users';

export const GetAllUserApi = async () => {
  const query = `
  query {
    findAll {
      success
      status
      users {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
  try {
    const data: any = await httpUsers.post('', {
      query,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
