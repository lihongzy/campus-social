import {addUser} from "@/services/ant-design-pro/api";
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, {PropsWithChildren} from 'react';

interface CreateModalProps {
  modalVisible: boolean;
  columns: ProColumns<API.CurrentUser>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.CurrentUser) => {
  const hide = message.loading('正在添加');
  try {
    const result = await addUser({ ...fields } as API.UserAddRequest);
    hide();
    if (result.code === 200){
      message.success('添加成功');
      return true;
    }else{
      message.error(result.description);
    }
    return false;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 创建数据模态框
 * @param props
 * @constructor
 */
const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = (props) => {
  const { modalVisible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="添加用户"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<API.CurrentUser, API.CurrentUser>
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        columns={columns}
      />
    </Modal>
  );
};

export default CreateModal;
