import logoImg from "../../assets/images/logo_light.svg";
import { UserOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { useHistory, Link} from "react-router-dom";

import "./index.scss";
// import { useEffect } from "react";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const CustomMenu = () => {
  const history = useHistory();

  const handleClick = async (e: any) => {
    if(e.key){
      history.push(`/${e.key}`)
    }
  };
  return (
    <>
      <Sider
        collapsible
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">
        <Link to="/home"><img src={logoImg} alt="" /></Link>
        </div>
        <Menu onClick={handleClick} theme="dark" mode="inline">
          <SubMenu key="menuConta" icon={<UserOutlined />} title="Conta">
            <Menu.Item key="configuracao_de_conta">Configurações</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
};