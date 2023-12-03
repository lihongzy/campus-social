import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';


import styles from './BaseView.less';
import {currentUser, updateLoginUser} from "@/services/ant-design-pro/api";

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  const { data: loginUser, loading } = useRequest(() => {
    return currentUser();
  });

  const getAvatarURL = () => {
    if (loginUser) {
      if (loginUser.avatarUrl) {
        return loginUser.avatarUrl;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const handleFinish = async (fields: API.CurrentUser) => {
    const hide = message.loading('正在修改');
    try {
      await updateLoginUser({
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

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              // onFinish={handleFinish}
              onFinish={async (value) => {
                const success = await handleFinish({
                  ...value,
                  id: loginUser.id,
                });

              }}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{
                ...loginUser,

              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="username"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormSelect
                width="sm"
                name="gender"
                label="性别"
                rules={[
                  {
                    required: true,
                    message: '请选择您的性别!',
                  },
                ]}
                options={[
                  {
                    label: '男',
                    value: '1',
                  },{
                    label: '女',
                    value: '0',
                  },
                ]}
              />
              <ProFormSelect
                width="sm"
                name="age"
                label="年龄"
                rules={[
                  {
                    required: true,
                    message: '请选择您的年龄!',
                  },
                ]}
                options={[
                  {
                    label: '15',
                    value: '15',
                  },{
                    label: '16',
                    value: '16',
                  },
                  {
                    label: '17',
                    value: '17',
                  },{
                    label: '18',
                    value: '18',
                  },
                  {
                    label: '19',
                    value: '19',
                  },{
                    label: '20',
                    value: '20',
                  },
                  {
                    label: '21',
                    value: '21',
                  },{
                    label: '22',
                    value: '22',
                  },
                  {
                    label: '23',
                    value: '23',
                  },{
                    label: '24',
                    value: '24',
                  },
                  {
                    label: '25',
                    value: '25',
                  },{
                    label: '26',
                    value: '26',
                  },
                ]}
              />
              <ProFormSelect
                width="sm"
                name="grade"
                label="年级"
                rules={[
                  {
                    required: true,
                    message: '请选择您的年级!',
                  },
                ]}
                options={[
                  {
                    label: '大一',
                    value: '大一',
                  },
                  {
                    label: '大二',
                    value: '大二',
                  },
                  {
                    label: '大三',
                    value: '大三',
                  },
                  {
                    label: '大四',
                    value: '大四',
                  },
                  {
                    label: '研一',
                    value: '研一',
                  },
                  {
                    label: '研二',
                    value: '研二',
                  },  {
                    label: '研三',
                    value: '研三',
                  },
                ]}
              />
              <ProFormSelect
                width="sm"
                name="colleage"
                label="学院"
                rules={[
                  {
                    required: true,
                    message: '请选择您所在学院!',
                  },
                ]}
                options={[
                  {
                    label: '教育学院',
                    value: '教育学院',
                  },
                  {
                    label: '心理学院',
                    value: '心理学院',
                  },
                  {
                    label: '经济学院',
                    value: '经济学院',
                  },
                  {
                    label: '法学院',
                    value: '法学院',
                  },
                  {
                    label: '马克思主义学院',
                    value: '马克思主义学院',
                  },
                  {
                    label: '文学院',
                    value: '文学院',
                  },
                  {
                    label: '外国语学院',
                    value: '外国语学院',
                  },  {
                    label: '传播学院',
                    value: '传播学院',
                  },
                  {
                    label: '社会历史学院',
                    value: '社会历史学院',
                  },
                  {
                    label: '公共管理学院',
                    value: '公共管理学院',
                  },
                  {
                    label: '旅游学院',
                    value: '旅游学院',
                  },
                  {
                    label: '体育科学学院',
                    value: '体育科学学院',
                  },
                  {
                    label: '音乐学院',
                    value: '音乐学院',
                  },
                  {
                    label: '数学与统计学院',
                    value: '数学与统计学院',
                  },
                  {
                    label: '计算机与网络空间安全学院',
                    value: '计算机与网络空间安全学院',
                  },
                  {
                    label: '光电与信息工程学院',
                    value: '光电与信息工程学院',
                  },
                  {
                    label: '化学与材料学院',
                    value: '化学与材料学院',
                  },
                  {
                    label: '地理科学学院',
                    value: '地理科学学院',
                  },
                  {
                    label: '生命科学学院',
                    value: '生命科学学院',
                  },
                  {
                    label: '海外教育学院',
                    value: '海外教育学院',
                  },

                ]}
              />
              <ProFormText
                width="md"
                name="major"
                label="专业"
                rules={[
                  {
                    required: true,
                    message: '请输入您的专业!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="contactinfo"
                label="联系方式"
                rules={[
                  {
                    required: false,
                    message: '请填写您的联系方式!',
                  },
                ]}
              />
              <ProFormTextArea
                name="interest"
                label="兴趣"
                rules={[
                  {
                    required: false,
                    message: '请填写你的兴趣爱好!',
                  },
                ]}
                placeholder="性别"
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
