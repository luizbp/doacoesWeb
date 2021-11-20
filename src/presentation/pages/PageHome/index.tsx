import { useEffect, useState } from "react";
import { TypeHomeParams } from "../PageHome/types/TypeHomeParams";
import toast, { Toaster } from "react-hot-toast";
import { ModelUser } from "../../../domain/Authenticator/models/ModelUser";
import { CustomMenu } from "../../components/CustomMenu";

import ImgConstrucao from "../../assets/images/construcao.svg";

import "./index.scss";

import { Layout, Breadcrumb } from "antd";
import { CustomHeader } from "../../components/CustomHeader";
const { Content, Footer } = Layout;

export function PageHome({ userAuthenticator }: TypeHomeParams) {
  const [vUser, setUser] = useState<ModelUser>();

  useEffect(() => {
    loadHome()
  }, []);

  const getDataUser = async () => {
    let user = await userAuthenticator.getUserSession();
    setUser(user);
  };

  const loadHome = async () => {
    await getDataUser();
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomMenu />
      <Layout className="site-layout">
        <CustomHeader userAuthenticator={userAuthenticator} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <p>Bem vindo {vUser?.name}</p>
            <img className="construcao" src={ImgConstrucao} alt="" />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 Squad Beato Carlo Acutis
        </Footer>
      </Layout>
      <Toaster />
    </Layout>
  );
}
