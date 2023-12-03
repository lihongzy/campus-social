import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Divider, Dropdown, Input, Modal, Popconfirm, Space, Typography} from 'antd';
import {deletePost, deleteUser, listPost, listUsers, updatePost} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import {useRef, useState} from "react";
import CreateModal from "@/pages/Admin/PostMange/components/CreateModal";
import 'antd/dist/antd.css';


/**
 * 帖子管理页面
 * @constructor
 */
const AdminPostPage: React.FC<unknown> = () => {


  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<API.Post>({});
  const actionRef = useRef<ActionType>();
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
  const doDelete = async (selectedRows: API.Post[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      const result = await deletePost({
        id: selectedRows.find((row) => row.id)?.id || 0,
      });
      if (result.code === 200) {
        message.success('操作成功');
      } else {
        message.error(result.description);
      }
    } catch (e: any) {
      message.error('操作失败，' + e.message);
    } finally {
      hide();
    }
  };

  /**
   * 更新审核状态
   * @param post
   * @param reviewStatus
   */
  const updateReviewStatus = async (
    post: API.Post,
    reviewStatus: number,
  ) => {
    const hide = message.loading('处理中');
    try {
      await updatePost({
        id: post.id,
        reviewStatus,
      });
      message.success('操作成功');
      actionRef.current?.reload();
    } catch (e: any) {
      message.error('操作失败，' + e.message);
    } finally {
      hide();
    }
  };



  const columns: ProColumns<API.Post>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '发布者id',
      dataIndex: 'userId',
      copyable: true
    },
    {
      title: '内容',
      dataIndex: 'content',
      copyable: true
    },
    {
      title: '照片',
      dataIndex: 'photo',
      copyable: true,
      render: (_, record) => (
        <div>
          <img src={record.photo} width={70}/>
        </div>
      ),
    },
    {
      title: '浏览数',
      dataIndex: 'viewNum',
    },
    {
      title: '点赞数',
      dataIndex: 'thumbNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueEnum: {
        0: {text: '待审核', status: 'Default'},
        1: {text: '通过', status: 'Success'},
        2: {text: '拒绝', status: 'Error'}
      },
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      copyable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space split={<Divider type="vertical"/>}>
          <Typography.Link
            onClick={() => {
              setUpdateData(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          {record.reviewStatus !== 1 && (
            <Typography.Link
              onClick={() => {
                updateReviewStatus(record, 1);
              }}
            >
              通过
            </Typography.Link>
          )}
          {record.reviewStatus !== 2 && (
            <Typography.Link
              type="danger"
              onClick={() => {
                updateReviewStatus(record, 2);
              }}
            >
              拒绝
            </Typography.Link>
          )}
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

  const columnsNeeded: ProColumns<API.Post>[] = [
    {
      title: '内容',
      dataIndex: 'content',
      copyable: true
    },
    {
      title: '照片',
      dataIndex: 'photo',
      copyable: true,
      render: (_, record) => (
        <div>
          <img src={record.photo} width={70}/>
        </div>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Post>
        headerTitle="帖子管理"
        actionRef={actionRef}
        columns={columns}
        // @ts-ignore
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          const result = await listPost();
          const postList = result.data;
          return Promise.resolve({
            data: postList
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
          title: '帖子列表',
          tooltip: '',
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            添加帖子
          </Button>,
        ]}
      />

      <CreateModal
        modalVisible={createModalVisible}
        columns={columnsNeeded}
        onSubmit={() => setCreateModalVisible(false)}
        onCancel={() => setCreateModalVisible(false)}
      />
    </PageContainer>
  );
};
export default AdminPostPage;
