import Image from 'next/image';

import { FormRegister } from '@/components/FormRegister';
import { Meta } from '@/layouts/Meta';
import { AuthTemplate } from '@/templates/LoginTemplate';

const Register = () => {
  return (
    <AuthTemplate meta={<Meta title="Register" description="" />}>
      <div className="w-3/4 px-24">
        <div className="mt-8 flex w-full justify-center">
          <Image
            alt=""
            width={300}
            height={200}
            src="/assets/gif/99797-data-management.gif"
          />
        </div>
        <div className=" mt-8 flex w-full justify-between">
          <Image
            alt=""
            width={300}
            height={200}
            src="/assets/gif/87986-data-analysis.gif"
          />
          <Image
            alt=""
            width={300}
            height={200}
            src="/assets/gif/92091-data-dashboard-lottie-animation.gif"
          />
        </div>
      </div>
      <div className="w-1/4 bg-gray-300">
        <FormRegister />
      </div>
    </AuthTemplate>
  );
};

export default Register;
