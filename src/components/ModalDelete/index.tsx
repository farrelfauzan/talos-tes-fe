/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable unused-imports/no-unused-vars */
import { Button, Modal } from 'antd';
import Image from 'next/image';
import React from 'react';

import { DeleteProductApi } from '@/services/users.service';

type IProps = {
  open: any;
  setOpen: any;
  selectedRow: any;
};

export const ModalDelete = (props: IProps) => {
  const handleOk = () => {
    props.selectedRow.map((item: any) => {
      return DeleteProductApi(item.id);
    });
    setTimeout(() => {
      props.setOpen({
        ...props.open,
        openDeleteModal: false,
      });
      window.location.reload();
    }, 3000);
  };

  const handleCancel = () => {
    props.setOpen({
      ...props.open,
      openDeleteModal: false,
    });
  };
  return (
    <div className="mt-32">
      <Modal
        title=""
        open={props.open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col items-center space-y-5 text-center">
          <div className="pt-5">
            <Image
              alt=""
              src="/assets/icons/decline.svg"
              width={50}
              height={50}
            />
          </div>
          <div className="text-lg font-bold text-gray-700">
            Are you sure you want to <p>delete the data?</p>
          </div>
          <div className="text-sm text-gray-400">
            This will permanently delete and you will not{' '}
            <p>be able to retrieve it.</p>
          </div>
          <div className="button-delete flex flex-row space-x-5 pt-5">
            <Button
              onClick={handleOk}
              className="h-12 w-32 rounded-lg border-0 bg-red-500 font-bold text-white hover:border-transparent hover:bg-red-500 hover:text-white focus:border-transparent focus:bg-red-500 focus:text-white "
            >
              Yes
            </Button>
            <Button
              onClick={handleCancel}
              type="link"
              className="h-12 w-32 rounded-lg border border-gray-400 font-bold text-gray-400 hover:border-gray-400 hover:text-gray-400 focus:border-gray-400 focus:text-gray-400"
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
