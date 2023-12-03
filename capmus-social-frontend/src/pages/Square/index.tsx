import {PageContainer} from '@ant-design/pro-components';
import {Avatar,Card} from 'antd';
import React, {useState} from 'react';
import ListVertical from '../../components/ListVertical';
import TagColorful from '../../components/TagColorful';
import CreateModal from "@/pages/Square/components/CreateModal";
import {currentUser} from "@/services/ant-design-pro/api";


const result = await currentUser();
const loginUser = result.data;


const SquarePage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  return (
    <PageContainer>
      {/*内容发布卡片*/}
      <Card
        // bordered={false}
        style={{ width: '100%',color:"gray"}}
        key="1"
        onClick={() => setCreateModalVisible(true)}
      >
        <span>
          {loginUser != null &&
            <Avatar
            src={loginUser.avatarUrl}
            style={{width: 50,height:50 }} // 自定义 avatar 样式
          />}
        点击发布内容...
        </span>
        <br/>
      </Card>
      <TagColorful />
      <ListVertical />
      <CreateModal
        modalVisible={createModalVisible}
        // columns={columnsNeeded}
        onSubmit={() => setCreateModalVisible(false)}
        onCancel={() => setCreateModalVisible(false)}
      />
    </PageContainer>
  );
};

export default SquarePage;
