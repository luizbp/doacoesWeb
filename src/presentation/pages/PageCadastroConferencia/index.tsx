import "./index.scss";

import { CustomHeader } from "../../components/CustomHeader";
import { CustomMenu } from "../../components/CustomMenu";

import { TypeCadastroConferenciaParams } from "./types/TypeCadastroConferenciaParams";

import { Toaster } from "react-hot-toast";

import { Layout, Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { TypeParamsCadConference } from "./types/TypeParamsCadConference";
import { FormStateListConferences } from "./FormStates/FormStateListConferences";
import { FormStateCadConferences } from "./FormStates/FormStateCadConferences";
const { Content, Footer } = Layout;

export const PageCadastroConferencia = ({
  userAuthenticator,
  registrationConference,
}: TypeCadastroConferenciaParams) => {
  const { idRegistry } = useParams<TypeParamsCadConference>();

  const verifyFormState = () => {
    if (idRegistry) {
      return (
        <FormStateCadConferences
          registrationConference={registrationConference}
          userAuthenticator={userAuthenticator}
        />
      );
    } else {
      return (
        <FormStateListConferences
          registrationConference={registrationConference}
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
            <Breadcrumb.Item>Configurações da </Breadcrumb.Item>
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
