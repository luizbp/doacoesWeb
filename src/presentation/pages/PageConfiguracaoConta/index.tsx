import { CustomHeader } from "../../components/CustomHeader";
import { CustomMenu } from "../../components/CustomMenu";

import { TypeConfiguracaoContaParams } from "./types/TypeConfiguracaoContaParams";

import toast, { Toaster } from "react-hot-toast";

import { Layout, Breadcrumb, Form, Input, Button } from "antd";
import { CustomButton } from "../../components/CustomButton";
const { Content, Footer } = Layout;

export const PageConfiguracaoConta = ({
  userAuthenticator,
  registrationUser,
}: TypeConfiguracaoContaParams) => {
  const handleLogin = async (e: any) => {
    try{
      const teste = await registrationUser.save()

      if(!teste){
        toast.error("Ocorreu um erro, tente novamente mais tarde")
        return
      }

      toast.success('Tudo OK')
      
    }catch(erro:any){
      toast.error('Teste')
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomMenu />
      <Layout className="site-layout">
        <CustomHeader userAuthenticator={userAuthenticator} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Configurações da Conta</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <h3>Configurações da conta</h3>
            <Form layout={"vertical"} onFinish={handleLogin}>
              <Form.Item
                name="fieldEmail"
                rules={[{ required: true, message: "Preencha o E-mail" }]}
              >
                <Input placeholder="E-mail" />
              </Form.Item>
              <Form.Item
                name="fieldPassword"
                rules={[{ required: true, message: "Preencha a senha" }]}
              >
                <Input.Password placeholder="Senha" />
              </Form.Item>
              <Form.Item>
                <CustomButton type="submit">
                  <span>Salvar</span>
                </CustomButton>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 Squad Beato Carlo Acutis
        </Footer>
      </Layout>
      <Toaster />
    </Layout>
  );
};
