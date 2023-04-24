/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import { Input } from 'antd';
import Image from 'next/image';

type ISearchProp = {
  search: string;
  setSearch: any;
  state: any;
};

export const SearchBar = (props: ISearchProp) => {
  return (
    <div className="search-bar">
      <Input
        prefix={
          <div className="ml-4">
            <Image
              alt=""
              src="/assets/icons/search.svg"
              width={20}
              height={20}
            />
          </div>
        }
        onChange={(e) =>
          props.setSearch({
            ...props.state,
            search: e.target.value,
          })
        }
        placeholder="Search..."
        size="large"
        className="bg-[#EBEBEB]"
      />
    </div>
  );
};
