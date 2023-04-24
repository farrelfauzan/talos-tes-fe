/* eslint-disable import/no-extraneous-dependencies */
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { useState } from 'react';

import ModalPicture from '../ModalPicture';

interface DataType {
  id: number;
  name: string;
  photo: string;
  buyPrice: number;
  sellPrice: number;
  stockLeft: number;
}
type IProps = {
  data: any;
  setSelectedRow: any;
};

const TableProduct = (props: IProps) => {
  const [state, setState] = useState({
    open: false,
    imageUrl: '',
  });
  const [, setPage] = useState(1);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      props.setSelectedRow(selectedRows);
    },
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'Buy Price',
      dataIndex: 'buyPrice',
      key: 'buyPrice',
      width: 100,
      fixed: 'left',
      align: 'center',
      render(_value, record, _index) {
        return (
          <div>
            {`Rp ${record.buyPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </div>
        );
      },
    },
    {
      title: 'Sell Price',
      dataIndex: 'sellPrice',
      key: 'sellPrice',
      width: 100,
      fixed: 'left',
      align: 'center',
      render(_value, record, _index) {
        return (
          <div>
            {`Rp ${record.buyPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </div>
        );
      },
    },
    {
      title: 'Stock Left',
      dataIndex: 'stockLeft',
      key: 'stockLeft',
      width: 100,
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      width: 100,
      fixed: 'left',
      align: 'center',
      render(_value, record, _index) {
        return (
          <div
            onClick={() => {
              setState({
                open: true,
                imageUrl: `http://3.27.90.80:3000/uploads/${record.photo}`,
              });
            }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Click to see picture
          </div>
        );
      },
    },
  ];
  const renderNoData = () => {
    return (
      <div className="flex justify-center">
        <Image
          alt=""
          src="/assets/gif/107420-no-data-loader.gif"
          width={200}
          height={200}
        />
      </div>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        rowSelection={rowSelection}
        rowKey={(record: any) => record.id}
        bordered
        size="middle"
        pagination={{
          onChange(current) {
            setPage(current);
          },
          pageSize: 5,
        }}
        locale={{ emptyText: renderNoData }}
      />
      {state.open ? (
        <ModalPicture
          open={state.open}
          imageUrl={state.imageUrl}
          setOpen={setState}
        />
      ) : null}
    </>
  );
};

export default TableProduct;
