import type { ReactNode } from 'react';

type ILoginProps = {
  meta: ReactNode;
  children: ReactNode;
};

const AuthTemplate = (props: ILoginProps) => (
  <div className="h-screen w-full overflow-hidden">
    {props.meta}
    <div className="flex h-screen">{props.children}</div>
  </div>
);

export { AuthTemplate };
