import "./index.scss";

import { CustomHeader } from "../../components/CustomHeader";
import { CustomMenu } from "../../components/CustomMenu";

import { TypeCadProductsParams } from "./types/TypeCadProductsParams";

import { Toaster } from "react-hot-toast";

import { Layout, Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { TypeParamsCadProducts } from "./types/TypeParamsCadProducts";
import { FormStateCadProducts } from "./FormStates/FormStateCadProducts";
import { FormStateListProducts } from "./FormStates/FormStateListProducts";
const { Content, Footer } = Layout;

export const PageCadastroProdutos = ({
  userAuthenticator,
  registrationProducts,
}: TypeCadProductsParams) => {
  const { idRegistry } = useParams<TypeParamsCadProducts>();

  const verifyFormState = () => {
    if (idRegistry) {
      return (
        <FormStateCadProducts
          registrationProducts={registrationProducts}
          userAuthenticator={userAuthenticator}
          idConferencia={idRegistry}
        />
      );
    } else {
      return (
        <FormStateListProducts
          registrationProducts={registrationProducts}
          userAuthenticator={userAuthenticator}
        />
      );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomMenu />
      <Layout className="site-layout">
        <CustomHeader userAuthenticator={userAuthenticator} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Cadastro de produtos</Breadcrumb.Item>
          </Breadcrumb>
          {verifyFormState()}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 Squad Beato Carlo Acutis
        </Footer>
      </Layout>
      <Toaster />
    </Layout>
  );
};
