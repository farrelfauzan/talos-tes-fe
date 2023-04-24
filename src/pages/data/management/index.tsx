/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalDelete } from '@/components/ModalDelete';
import { ModalUpload } from '@/components/ModalUpload';
import { SearchBar } from '@/components/SearchBar';
import TableProduct from '@/components/TableProduct';
import { Meta } from '@/layouts/Meta';
import { GetAllUserApi } from '@/services/users.service';
import { GetAllProduct } from '@/slices/ProductSlices';
import { Main } from '@/templates/Main';
import type { IData } from '@/types/Data.type';

const DataManagement = () => {
  // const dispatch = useDispatch();
  const AllProduct = useSelector(GetAllProduct);
  const [selectedRows, setSelectedRows] = useState([]);
  const [state, setState] = useState({
    openUploadModal: false,
    openDeleteModal: false,
    search: '',
  });
  const [dataTable, setDataTable] = useState<IData[]>([]);
  useEffect(() => {
    GetAllUserApi();
    setDataTable(AllProduct.data);
  }, []);
  useEffect(() => {
    const filteredData = AllProduct.data.filter((val) => {
      if (state.search === '') {
        return true; // return true to include all elements if search is empty
      }
      return val.name.toLowerCase().includes(state.search?.toLowerCase());
    });
    setDataTable(filteredData);
  }, [AllProduct.data, state.search]);

  useEffect(() => {
    setDataTable(dataTable);
  }, [dataTable]);

  return (
    <Main
      meta={<Meta title="Data Management" description="" />}
      selectedKeys={['products']}
    >
      <div className="flex bg-gray-300">
        <div className="h-screen w-1/4 bg-gray-500">
          <div className="mt-44 flex w-full items-center justify-center p-2 ">
            <Image
              alt=""
              width={300}
              height={200}
              src="/assets/images/data-platform-600x500.png"
            />
          </div>
        </div>
        <div className="flex w-3/4 flex-col justify-center space-y-6 p-8 ">
          <div className="text-lg font-semibold">User Management System</div>
          <SearchBar search={state.search} setSearch={setState} state={state} />
          <div className="flex w-full justify-end space-x-3">
            {/* <Button
              onClick={() =>
                setState({
                  ...state,
                  openUploadModal: true,
                })
              }
              className="bg-orange-400 text-white"
            >
              Add Product
            </Button> */}
            {/* <Button
              disabled={!(selectedRows.length > 0)}
              onClick={() =>
                setState({
                  ...state,
                  openDeleteModal: true,
                })
              }
              className="bg-red-700 text-white"
            >
              Delete
            </Button> */}
          </div>
          <TableProduct data={dataTable} setSelectedRow={setSelectedRows} />
        </div>
        {state.openUploadModal ? (
          <ModalUpload open={state.openUploadModal} setOpen={setState} />
        ) : null}
        {state.openDeleteModal ? (
          <ModalDelete
            open={state.openDeleteModal}
            setOpen={setState}
            selectedRow={selectedRows}
          />
        ) : null}
      </div>
    </Main>
  );
};

export default DataManagement;
