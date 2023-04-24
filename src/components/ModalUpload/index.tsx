/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const { Dragger } = Upload;

type IProps = {
  open: any;
  setOpen: any;
};

export const ModalUpload = (props: IProps) => {
  const dispatch = useDispatch();
  const [FormUpload] = Form.useForm();
  const [state, setState] = useState<any>({
    file: null,
  });
  console.log(state.file);
  const handleCancel = () => {
    props.setOpen({
      ...props.open,
      openUploadModal: false,
    });
  };
  const onFinish = () => {
    FormUpload.validateFields().then((val) => {
      const payload = {
        photo: state.file,
        name: val.name,
        buyPrice: val.buyPrice,
        sellPrice: val.sellPrice,
        stockLeft: val.stockLeft,
      };
      UploadProductApi(payload);
      setTimeout(() => {
        GetAllProductApi(dispatch);
        window.location.reload();
        handleCancel();
      }, 3000);
    });
  };
  // const handleUploadChange = (info: any) => {
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} uploaded successfully`);
  //     setFile(info.fileList[0]);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} upload failed.`);
  //   }
  // };

  const handleKeyPress = (e: any) => {
    // Prevent input of non-numeric characters
    const charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode !== 8 && charCode !== 0 && charCode !== 13 && charCode < 48) ||
      charCode > 57
    ) {
      e.preventDefault();
    }
  };

  const currencyFormatter = (value: any) => {
    return `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const currencyParser = (value: any) => {
    // Parse currency value into number
    return value.replace(/Rp\s?|(\.*)/g, '');
  };

  const propsUpload: UploadProps = {
    name: 'file',
    multiple: false,
    action: '/api/noop',
    maxCount: 1,
    accept: '.jpg, .png', // Accept only .jpg and .png files
    beforeUpload(file) {
      // Validate file size
      const maxSize = 100 * 1024; // 100KB
      if (file.size > maxSize) {
        message.error('File size must be no more than 100KB');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      setState({
        file: info.fileList[0]?.originFileObj,
      });
    },
  };

  return (
    <div className="mt-32">
      <Modal
        title=""
        open={props.open}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <h1 className="text-3xl font-semibold text-black">Add Product</h1>
        </div>
        <div className="mt-8">
          <Form layout="vertical" form={FormUpload} onFinish={onFinish}>
            <Form.Item
              name="file"
              rules={[
                {
                  required: true,
                  message: 'Please input file',
                },
              ]}
            >
              <Dragger {...propsUpload}>
                <div className="px-10">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </div>
              </Dragger>
            </Form.Item>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="buyPrice" label="Buy Price">
              <InputNumber
                formatter={currencyFormatter}
                parser={currencyParser}
                onKeyPress={handleKeyPress}
                min={0}
              />
            </Form.Item>
            <Form.Item name="sellPrice" label="Sell Price">
              <InputNumber
                formatter={currencyFormatter}
                parser={currencyParser}
                onKeyPress={handleKeyPress}
                min={0}
              />
            </Form.Item>
            <Form.Item name="stockLeft" label="StockLeft">
              <InputNumber min={0} onKeyPress={handleKeyPress} />
            </Form.Item>
            <div className="flex justify-end">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="flex items-center bg-orange-500 text-white"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
