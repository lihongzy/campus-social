
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Divider, Dropdown, Input, Modal, Popconfirm, Space, Typography} from 'antd';
import {deleteUser, listUsers} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import {useRef, useState} from "react";
import UpdateModal from "@/pages/Admin/UserMange/components/UpdateModal";
import CreateModal from "@/pages/Admin/UserMange/components/CreateModal";
import 'antd/dist/antd.css';



const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

/**
 *  删除节点
 * @param selectedRows
 */
const doDelete = async (selectedRows: API.CurrentUser[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const result = await deleteUser({
      id: selectedRows.find((row) => row.id)?.id || 0,
    });
    if(result.code === 200){
      message.success('操作成功');
    }else {
      message.error(result.description);
    }
  } catch (e: any) {
    message.error('操作失败，' + e.message);
  } finally {
    hide();
  }
};


/**
 * 用户管理页面
 * @constructor
 */
const AdminUserPage: React.FC<unknown> = () => {

  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<API.CurrentUser>({});
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      copyable: true
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      copyable: true,
      render: (_, record) => (
        <div>
          <img src={record.avatarUrl} width={70} />
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: { text: '男', status: 'Default' },
        1: { text: '女', status: 'Success' },
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '年级',
      dataIndex: 'grade',
    },
    {
      title: '学院',
      dataIndex: 'colleage',
    },
    {
      title: '专业',
      dataIndex: 'major',
    },
    {
      title: '兴趣',
      dataIndex: 'interest',
    },

    {
      title: '电话',
      dataIndex: 'phone',
      copyable: true
    },
    {
      title: '联系方式',
      dataIndex: 'contactinfo',
      copyable: true
    },{
      title: '状态',
      dataIndex: 'userStatus',
      valueEnum: {
        0: { text: '正常',  },
      },
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: "select",
      valueEnum: {
        0: { text: '普通用户', status: 'Default' },
        1: { text: '管理员', status: 'Success' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link
            onClick={() => {
              setUpdateData(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="您确定要删除么？"
            onConfirm={() => doDelete([record])}
            okText="确认"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },

  ];

  return (
    <PageContainer>
      <ProTable<API.CurrentUser>
        headerTitle="用户管理"
        actionRef={actionRef}
        columns={columns}
        // @ts-ignore
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          const result = await listUsers();
          const userList = result.data;
          return Promise.resolve({
            data: userList
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '用户列表',
          tooltip: '',
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            添加用户
          </Button>,
        ]}
      />
      <CreateModal
        modalVisible={createModalVisible}
        columns={columns}
        onSubmit={() => setCreateModalVisible(false)}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateModal
        oldData={updateData}
        modalVisible={updateModalVisible}
        columns={columns}
        onSubmit={() => setUpdateModalVisible(false)}
        onCancel={() => setUpdateModalVisible(false)}
      />

    </PageContainer>
  );
};
export default AdminUserPage;
