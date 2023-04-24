/* eslint-disable import/no-extraneous-dependencies */
import { Modal } from 'antd';
import Image from 'next/image';

interface ModalPictureProps {
  open: boolean;
  setOpen: any;
  imageUrl: string; // Pass the image URL as a prop
}

const ModalPicture: React.FC<ModalPictureProps> = ({
  open,
  setOpen,
  imageUrl,
}) => {
  const handleCancel = () => {
    setOpen({
      open: false,
    });
  };

  return (
    <Modal visible={open} onCancel={handleCancel} footer={null}>
      <div className="h-full w-full">
        <Image alt="" src={imageUrl} width={600} height={600} />
      </div>
    </Modal>
  );
};

export default ModalPicture;
