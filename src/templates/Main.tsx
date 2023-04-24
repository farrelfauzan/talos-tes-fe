import type { ReactNode } from 'react';

import Navbar from '@/components/Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  selectedKeys: any;
};

const Main = (props: IMainProps) => (
  <div className="h-screen  w-full overflow-hidden text-gray-700 antialiased">
    {props.meta}
    <Navbar selectedKeys={props.selectedKeys} />
    {props.children}
  </div>
);

export { Main };
