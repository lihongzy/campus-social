import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '李轰+李铭杰 出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'LabiPlanet',
          title: '校园社交平台',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> 李轰+李铭杰 Coder</>,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
