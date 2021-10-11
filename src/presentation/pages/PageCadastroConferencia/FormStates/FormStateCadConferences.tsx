import toast, { Toaster } from "react-hot-toast";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Skeleton,
} from "antd";
import { useEffect, useState } from "react";
import { ModelRegistrationConference } from "../../../../domain/User/models/ModelRegistrationConference";
import { TypeFormStateCadConferences } from "../types/TypeCadastroConferenciaParams";
import { MaskedInput } from "antd-mask-input";

export const FormStateCadConferences = ({
  registrationConference, userAuthenticator
}: TypeFormStateCadConferences) => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);
  const [dataConference, setDataConference] =
    useState<ModelRegistrationConference>({
      id: "",
      tb_user_id: "",
      name_company: "",
      nick_trade: "",
      note: "",
      email: "",
      kind_phone: "",
      contact: "",
      number: "",
      address_kind: "",
      kind_address: "",
      address: "",
      nmbr: "",
      complement: "",
      region: "",
      zip_code: "",
      country: "",
      opening_hours: "",
      link_map: "",
      state: "",
      city: "",
      created_at: "",
      updated_at: "",
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsFormLoading(true);
    try {
      const { idUser } = await userAuthenticator.getUserSession();
      const retorno = await registrationConference.get(idUser);
      setDataConference(retorno);
    } catch (erro: any) {
      toast.error(erro.message);
    }
    setIsFormLoading(false);
  };

  const handleExecute = (data: any) => {
  };

  return (
    <section className="configuracoes-conta">
      <Form layout={"vertical"} onFinish={handleExecute}>
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
                      value={dataConference.name_company}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
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
                      value={dataConference.nick_trade}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
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
                      value={dataConference.note}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
                          note: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="E-mail">
                    <Input
                      placeholder="E-mail"
                      id="email"
                      name="email"
                      value={dataConference.email}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Row gutter={12}>
                    <Col lg={12} md={24} className="colum-card">
                      <Form.Item label="Celular">
                        <MaskedInput mask="(11) 11111-1111" name="number" id="number"
                          value={dataConference.number}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataConference({
                              ...dataConference,
                              number: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} className="colum-card">
                      <Form.Item label="Descrição do Celular">
                        <Input
                          placeholder="Ex: Principal"
                          id="contact"
                          name="contact"
                          value={dataConference.contact}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataConference({
                              ...dataConference,
                              contact: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Skeleton>
              </Card>
            </Col>
            {/* // Segundo card */}
            <Col lg={12} md={24} className="colum-card">
              <Card title="Informações de Endereço" bordered={false}>
                <Skeleton loading={isFormLoading} active>
                  <Row gutter={12}>
                    <Col lg={12} md={24} className="colum-card">
                      <Form.Item label="Endereço">
                        <Input
                          placeholder="Endereço"
                          id="address"
                          name="address"
                          value={dataConference.address}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataConference({
                              ...dataConference,
                              address: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} className="colum-card">
                      <Form.Item label="Numero">
                        <MaskedInput mask="111111" name="nmbr" id="nmbr"
                          value={dataConference.nmbr}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataConference({
                              ...dataConference,
                              nmbr: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Complemento">
                    <Input
                      placeholder="Complemento"
                      id="complement"
                      name="complement"
                      value={dataConference.complement}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
                          complement: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="CEP">
                    <MaskedInput mask="11111-111" name="zip_code" id="zip_code"
                      value={dataConference.zip_code}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
                          zip_code: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Pais">
                    <Input
                      placeholder="Pais"
                      id="country"
                      name="country"
                      value={dataConference.country}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
                          country: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Horario de funcionamento">
                    <Input.TextArea
                      placeholder="Ex: Segunda: 08:00 ás 12:00"
                      id="opening_hours"
                      name="opening_hours"
                      value={dataConference.opening_hours}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataConference({
                          ...dataConference,
                          opening_hours: e.target.value,
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
  );
};
