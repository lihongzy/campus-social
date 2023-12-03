
import {updateUser} from "@/services/ant-design-pro/api";
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, {PropsWithChildren, useState} from 'react';

interface UpdateModalProps {
  oldData: API.CurrentUser;
  modalVisible: boolean;
  columns: ProColumns<API.CurrentUser>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: API.CurrentUser) => {
  const hide = message.loading('正在修改');
  try {
    await updateUser({
      id: fields.id ?? 0,
      ...fields,
    });
    hide();
    message.success('修改成功');

    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 * 更新数据模态框
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<PropsWithChildren<UpdateModalProps>> = (props) => {
  const { oldData, columns, modalVisible, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="更新"
      // visible={modalVisible}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<API.CurrentUser, API.CurrentUser>
        rowKey="id"
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (value) => {
          const success = await handleUpdate({
            ...value,
            id: oldData.id,
          });
          if (success) {
            onSubmit?.();

          }
        }}
      />
    </Modal>
  );
};

export default UpdateModal;
