import "./index.scss";

import { CustomHeader } from "../../components/CustomHeader";
import { CustomMenu } from "../../components/CustomMenu";

import { TypeCadastroConferenciaParams } from "./types/TypeCadCestasBasicasParams";

import { Toaster } from "react-hot-toast";

import { Layout, Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { TypeParamsCadCestasBasicas } from "./types/TypeParamsCadCestasBasicas";
import { FormStateListCestasBasicas } from "./FormStates/FormStateListCestasBasicas";
import { FormStateCadCestasBasicas } from "./FormStates/FormStateCadCestasBasicas";
const { Content, Footer } = Layout;

export const PageCadastroCestaBasica = ({
  userAuthenticator,
  registrationBasicBasket,
}: TypeCadastroConferenciaParams) => {
  const { idRegistry } = useParams<TypeParamsCadCestasBasicas>();

  const verifyFormState = () => {
    if (idRegistry) {
      return (
        <FormStateCadCestasBasicas
          registrationBasicBasket={registrationBasicBasket}
          userAuthenticator={userAuthenticator}
          idConferencia={idRegistry}
        />
      );
    } else {
      return (
        <FormStateListCestasBasicas
          registrationBasicBasket={registrationBasicBasket}
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
            <Breadcrumb.Item>Cadastro de Cestas Básicas</Breadcrumb.Item>
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
