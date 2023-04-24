/* eslint-disable import/no-extraneous-dependencies */
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { LogoutApi } from '@/services/auth.service';

type IPropNav = {
  selectedKeys: any;
};

const Navbar = (props: IPropNav) => {
  const router = useRouter();
  const Logout = () => {
    LogoutApi(router);
  };
  return (
    <div className="flex w-full">
      <Menu
        mode="horizontal"
        theme="dark"
        className="bg-gray-500"
        style={{
          border: 'none',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          paddingTop: '2px',
        }}
        defaultSelectedKeys={props.selectedKeys}
      >
        <Menu.Item
          key="products"
          style={
            props.selectedKeys[0] === 'products'
              ? {
                  color: '#ffff',
                  backgroundColor: 'rgba(107, 114, 128, 0.4)',
                  borderRadius: '10px 10px 0 0',
                }
              : { color: '#000000' }
          }
        >
          Users
        </Menu.Item>
      </Menu>
      <Menu
        mode="horizontal"
        theme="dark"
        className="bg-gray-500"
        style={{
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px',
        }}
      >
        <Menu.Item
          key="logout"
          style={
            props.selectedKeys[0] === 'profile'
              ? {
                  color: '#ffff',
                  backgroundColor: 'rgba(107, 114, 128, 0.4)',
                  borderRadius: '10px 10px 0 0',
                }
              : { color: '#000000', backgroundColor: 'transparent' }
          }
        >
          <Button onClick={Logout} className="flex items-center bg-red-500">
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
