import "./index.scss";

import { CustomHeader } from "../../components/CustomHeader";
import { CustomMenu } from "../../components/CustomMenu";

import { TypeConfiguracaoContaParams } from "./types/TypeConfiguracaoContaParams";

import toast, { Toaster } from "react-hot-toast";

import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Skeleton,
} from "antd";
import { useEffect, useState } from "react";
import { ModelRegistrationUser } from "../../../domain/User/models/ModelRegistrationUser";
const { Content, Footer } = Layout;

export const PageConfiguracaoConta = ({
  userAuthenticator,
  registrationUser,
}: TypeConfiguracaoContaParams) => {
  const [isFormLoading, setIsFormLoading] = useState(false);

  const [isSaveLoading, setSaveLoading] = useState(false);

  const [dataUser, setDataUser] = useState<ModelRegistrationUser>({
    id: "",
    name_company: "",
    nick_trade: "",
    note: "",
    cnpj: "",
    ie: "",
    im: "",
    dt_foundation: "",
    email: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsFormLoading(true);
    try {
      const { idUser } = await userAuthenticator.getUserSession();
      const retorno = await registrationUser.get(idUser);
      setDataUser(retorno);
    } catch (erro: any) {
      toast.error(erro.message);
    }
    setIsFormLoading(false);
  };

  const handleLogin = async (e: any) => {
    try {
      setSaveLoading(true);
      const retorno = await registrationUser.save(dataUser);
      if (!retorno)
        toast.error(
          "Ocorreu um erro, tente novamente mais tarde, ou contacte o suporte"
        );

      toast.success("Dados Atualizados com sucesso!!");
    } catch (erro: any) {
      toast.error(erro.message);
    }
    setSaveLoading(false);
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
          <section className="configuracoes-conta">
            <Form layout={"vertical"} onFinish={handleLogin}>
              <div className="site-card-wrapper">
                <Row gutter={16}>
                  <Col lg={12} md={24} className="colum-card">
                    <Card title="Informações da conta" bordered={false}>
                      <Skeleton loading={isFormLoading} active>
                        <Form.Item label="Nome">
                          <Input
                            placeholder="Nome"
                            id="name_company"
                            name="name_company"
                            value={dataUser.name_company}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                name_company: e.target.value,
                              })
                            }
                          />
                        </Form.Item>

                        <Form.Item label="Apelido">
                          <Input
                            placeholder="Apelido"
                            id="nick_trade"
                            name="nick_trade"
                            value={dataUser.nick_trade}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                nick_trade: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Descrição">
                          <Input.TextArea
                            placeholder="Descrição"
                            id="note"
                            name="note"
                            value={dataUser.note}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                note: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                      </Skeleton>
                    </Card>
                  </Col>
                  {/* // Segundo card */}
                  <Col lg={12} md={24} className="colum-card">
                    <Card title="Informações da Companhia" bordered={false}>
                      <Skeleton loading={isFormLoading} active>
                        <Form.Item label="CNPJ">
                          <Input
                            placeholder="CNPJ"
                            id="cnpj"
                            name="cnpj"
                            value={dataUser.cnpj}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                cnpj: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Inscrição estadual">
                          <Input
                            placeholder="Inscrição estadual"
                            id="ie"
                            name="ie"
                            value={dataUser.ie}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                ie: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Inscrição municipal">
                          <Input
                            placeholder="Inscrição municipal"
                            id="im"
                            name="im"
                            value={dataUser.im}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                im: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Data da fundação">
                          <Input
                            placeholder="Data da fundação"
                            id="dt_foundation"
                            name="dt_foundation"
                            value={dataUser.dt_foundation}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                dt_foundation: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label="E-mail">
                          <Input
                            placeholder="E-mail"
                            id="email"
                            name="email"
                            value={dataUser.email}
                            readOnly={isSaveLoading}
                            onChange={(e) =>
                              setDataUser({
                                ...dataUser,
                                email: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                      </Skeleton>
                    </Card>
                  </Col>
                </Row>
              </div>
              <div className="actions">
                {isFormLoading || (
                  <Button disabled={isSaveLoading} htmlType="submit">
                    {isSaveLoading ? "Aguarde..." : "Salvar"}
                  </Button>
                )}
              </div>
            </Form>
          </section>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 Squad Beato Carlo Acutis
        </Footer>
      </Layout>
      <Toaster />
    </Layout>
  );
};
