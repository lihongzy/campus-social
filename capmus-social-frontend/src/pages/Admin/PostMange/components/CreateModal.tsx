import {addPost} from "@/services/ant-design-pro/api";
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, {PropsWithChildren} from 'react';

interface CreateModalProps {
  modalVisible: boolean;
  columns: ProColumns<API.Post>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.Post) => {
  const hide = message.loading('正在添加');
  try {
    const result = await addPost({ ...fields } as API.PostAddRequest);
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
      title="添加帖子"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<API.Post, API.Post>
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
