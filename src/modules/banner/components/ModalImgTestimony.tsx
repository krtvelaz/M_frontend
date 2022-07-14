import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { FC, useState } from 'react';
import { watch } from '../../../utils/assets/img';
import { ITestimony } from '../custom_types';

interface IModalImage {
    document_entrepreneur: File;
    document_logo: File;
  }
const ModalImgTestimony: FC<IModalImage> = ({
    document_entrepreneur,
    document_logo,
}) => {
    const [url, setUrl] = useState("");
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => set_is_visible(true);
    const close = () => set_is_visible(false);
    // const url = window.URL.createObjectURL(document);

    const menu = (
        
        <Menu
        onClick={(e) => {
           if (e.key === "image_0") {
            setUrl ( window.URL.createObjectURL(document_entrepreneur));
            open();
            return ;

           }
           setUrl ( window.URL.createObjectURL(document_logo));
            open();
        }}
          items={[
            {
              label:"Imagen Empresario",
              key: 'image_0',
            },
            {
              label: "Imagen Logo",
              key: 'image_1',
            },
            
          ]}
        />
      );
  return (
    <>
    <Dropdown overlay={menu} trigger={['click']}>

      <img
        src={watch}
        className="img"
        alt=""
        style={{ cursor: "pointer" }}
        // onClick={() => open()}
      />
 
  </Dropdown>

  <Modal
        visible={is_visible}
        width={751}
        onCancel={close}
        title={
          <span style={{ fontFamily: "Montserrat-SemiBold", fontSize: "16px" }}>
            Previsualizar documento
          </span>
        }
        maskStyle={{
          backgroundColor: "rgba(6, 100, 144 ,0.8)",
        }}
        footer={[
          <button
            key="saveDoc"
            type="button"
            className="btn btn-primary"
            onClick={() => {
              close();
            }}
          >
            Aceptar
          </button>,
        ]}
      >
        <div>
          <embed src={`${url}#toolbar=0`} width="100%" height="375px" />
        </div>
      </Modal>
    </>
    
    
);

}

export default ModalImgTestimony