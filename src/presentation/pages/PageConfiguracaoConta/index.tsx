import { CustomHeader } from "../../camponents/CustomHeader";
import { CustomMenu } from "../../camponents/CustomMenu";

import { TypeConfiguracaoContaParams } from "./types/TypeConfiguracaoContaParams";

import toast, { Toaster } from "react-hot-toast";

import { Layout, Breadcrumb } from "antd";
const { Content, Footer } = Layout;

export const PageConfiguracaoConta = ({
  userAuthenticator,
}: TypeConfiguracaoContaParams) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomMenu />
      <Layout className="site-layout">
        <CustomHeader userAuthenticator={userAuthenticator} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Configurações da Conta</Breadcrumb.Item>
          </Breadcrumb>
          <div>Teste</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 Squad Beato Carlo Acutis
        </Footer>
      </Layout>
      <Toaster />
    </Layout>
  );
};
