import logoImg from "../../assets/images/logo_light.svg";
import { UserOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { TypeCustomMenuParam } from "./types/TypeCustomMenuParam";

import "./index.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const CustomMenu = ({ userAuthenticator }: TypeCustomMenuParam) => {
  const history = useHistory();

  const handleClick = async (e: any) => {
    console.log("TCL: handleClick -> e", e);
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
          <img src={logoImg} alt="" />
        </div>
        <Menu onClick={handleClick} theme="dark" mode="inline">
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
};
