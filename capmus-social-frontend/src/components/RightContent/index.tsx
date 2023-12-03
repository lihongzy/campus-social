import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';
export type SiderTheme = 'light' | 'dark';
const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const { navTheme, layout } = initialState.settings;
  let className = styles.right;
  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="快来使用搜索吧"
        options={[
          {
            label: <a href="https://www.zhihu.com/tardis/bd/art/485163178?source_id=1001">如何变得更帅</a>,
            value: '如何变得更帅',
          },
          {
            label: <a href="https://wen.baidu.com/question/1933855791299800947.html">太帅了怎么办</a>,
            value: '太帅了怎么办',
          },
          {
            label: <a href="https://www.zhihu.com/question/421417317/answer/1478775307">要找几个对象</a>,
            value: '要找几个对象',
          },
          {
            label: <a href="https://www.zhihu.com/question/474843273/answer/2038946070">没有对象怎么办</a>,
            value: '没有对象怎么办',
          },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={styles.action}
        onClick={() => {
          window.open();
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
