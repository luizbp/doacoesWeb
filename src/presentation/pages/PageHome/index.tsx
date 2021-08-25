import { Layout, Menu, Breadcrumb, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PageLoginParams } from "../../types/PageLoginParams";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ModelUser } from "../../../domain/models/ModelUser";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export function PageHome({ userAuthenticator }: PageLoginParams) {
  const [collapsed, setCollapsed] = useState(false);
  const [vUser, setUser] = useState<ModelUser>();

  const history = useHistory();

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    try {
      const requestSession = await userAuthenticator.checkSession();
      if (!requestSession.isLogged) history.push("/");
      setUser(requestSession.user);
    } catch (error) {
      toast.error(`Erro na validação de sessão: ${error}`);
    }
  };

  const handleClick = async (e: any) => {
    console.log("TCL: handleClick -> e", e);
    if (e.key === "loggout") {
      const response = await userAuthenticator.signOut();
      if (response) {
        history.push("/");
      }
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu onClick={handleClick} theme="dark" mode="vertical">
          <SubMenu key="sub1" icon={<UserOutlined />} title="Options">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="loggout">Loggout</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        ,
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bem vindo {vUser?.name}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
