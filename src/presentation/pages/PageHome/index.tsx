import { useEffect, useState } from "react";
import { TypeHomeParams } from "../PageHome/types/TypeHomeParams";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ModelUser } from "../../../domain/models/ModelUser";
import { CustomMenu } from "../../camponents/CustomMenu";

import ImgConstrucao from '../../assets/images/construcao.svg'


import './index.scss'

import { Layout, Breadcrumb } from "antd";
import { CustomHeader } from "../../camponents/CustomHeader";
const {Content, Footer } = Layout;


export function PageHome({ userAuthenticator }: TypeHomeParams) {
  const [collapsed, setCollapsed] = useState(false);
  const [vUser, setUser] = useState<ModelUser>();

  const history = useHistory();

  // TODO: Implementar um código que execute antes da pagina ser renderizada
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

  

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomMenu userAuthenticator={userAuthenticator}/>
      <Layout className="site-layout">
        <CustomHeader userAuthenticator={userAuthenticator}/>
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
      <Toaster/>
    </Layout>
  );
}
