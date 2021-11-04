import toast, { Toaster } from "react-hot-toast";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Skeleton,
  Checkbox,
} from "antd";
import { useEffect, useState } from "react";
import { ModelRegistrationCestasBasicas } from "../../../../domain/User/models/ModelRegistrationCestasBasicas";
import { TypeFormStateCadCestasBasicas } from "../types/TypeCadCestasBasicasParams";
import { MaskedInput } from "antd-mask-input";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { ModelTabBasicBasket } from "../../../../domain/Produtc/models/ModelTabBasicBasket";

export const FormStateCadCestasBasicas = ({
  registrationBasicBasket, userAuthenticator, idConferencia
}: TypeFormStateCadCestasBasicas) => {

  const history = useHistory();
  
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);

  const [dataCestasBasicas, setDataCestasBasicas] =
    useState<ModelTabBasicBasket>({
      id: "",
      active: true,
      description: '',
      identifier: '',
      produtos: [],
      tb_user_id: ''
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if(idConferencia !== 'novo'){
      setIsFormLoading(true);
      try {
        const { idUser } = await userAuthenticator.getUserSession();
        const retorno = await registrationBasicBasket.get(idUser, idConferencia);
        setDataCestasBasicas(retorno);
      } catch (erro: any) {
        toast.error(erro.message);
      }
      setIsFormLoading(false);
    }
  };

  const handleExecute = async () => {
    try {
      setSaveLoading(true);
      const { idUser } = await userAuthenticator.getUserSession();
      const retorno = await registrationBasicBasket.save(idUser, idConferencia, dataCestasBasicas);
      if (!retorno)
        toast.error(
          "Ocorreu um erro, tente novamente mais tarde, ou contacte o suporte"
        );

      toast.success("Dados Atualizados com sucesso!!");
      history.go(-1);
    } catch (erro: any) {
      toast.error(erro.message);
    }
    setSaveLoading(false);
  };

  const handleCancel = async () => {
    swal({
      title: "Atenção, todos os dados não salvos seram perdidos?",
      icon: "info",
      buttons: ['Cancelar', true],
    }).then(async (willDelete) => {
      if (willDelete) {
        history.go(-1);
      }
    });
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
                      placeholder="Ex: Conferencia São José"
                      id="name_company"
                      name="name_company"
                      value={dataCestasBasicas.name_company}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          name_company: e.target.value,
                        })
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Apelido">
                    <Input
                      placeholder="Ex: Primeiro de Campinas"
                      id="nick_trade"
                      name="nick_trade"
                      value={dataCestasBasicas.nick_trade}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          nick_trade: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Sobre">
                    <Input.TextArea
                      placeholder="Ex: Conferencia em funcionamento desde 1998..."
                      id="note"
                      name="note"
                      value={dataCestasBasicas.note}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
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
                      value={dataCestasBasicas.email}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Row gutter={12}>
                    <Col lg={12} md={24} className="colum-card">
                      <Form.Item label="Celular">
                        <MaskedInput mask="(11) 11111-1111" name="number" id="number"
                          value={dataCestasBasicas.number}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataCestasBasicas({
                              ...dataCestasBasicas,
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
                          value={dataCestasBasicas.contact}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataCestasBasicas({
                              ...dataCestasBasicas,
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
                          placeholder="Ex: Av. São Paulo Entre a 22x20"
                          id="address"
                          name="address"
                          value={dataCestasBasicas.address}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataCestasBasicas({
                              ...dataCestasBasicas,
                              address: e.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} className="colum-card">
                      <Form.Item label="Numero">
                        <MaskedInput mask="111111" name="nmbr" id="nmbr"
                          value={dataCestasBasicas.nmbr.toString()}
                          readOnly={isSaveLoading}
                          onChange={(e) =>
                            setDataCestasBasicas({
                              ...dataCestasBasicas,
                              nmbr: parseInt(e.target.value),
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Complemento">
                    <Input
                      placeholder="Ex: Prédio"
                      id="complement"
                      name="complement"
                      value={dataCestasBasicas.complement}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          complement: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="CEP">
                    <MaskedInput mask="11111-111" name="zip_code" id="zip_code"
                      value={dataCestasBasicas.zip_code}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          zip_code: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Pais">
                    <Input
                      placeholder="Ex: Brasil"
                      id="country"
                      name="country"
                      value={dataCestasBasicas.country}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          country: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Estado">
                    <Input
                      placeholder="Ex: São Paulo"
                      id="state"
                      name="state"
                      value={dataCestasBasicas.state}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          state: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Cidade">
                    <Input
                      placeholder="Ex: Campinas"
                      id="city"
                      name="city"
                      value={dataCestasBasicas.city}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          city: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  {/* TODO:  Melhorar a forma de cadastro de horarios*/}
                  <Form.Item label="Horario de funcionamento">
                    <Input.TextArea
                      placeholder="Ex: Segunda: 08:00 ás 12:00"
                      id="opening_hours"
                      name="opening_hours"
                      value={dataCestasBasicas.opening_hours}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          opening_hours: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  {/* TODO: Colocar uma ferramenta de escolher no mapa */}
                  <Form.Item label="Link da Localização (Mapa)">
                    <Input
                      placeholder="Ex: www.sadas.com"
                      id="link_map"
                      name="link_map"
                      value={dataCestasBasicas.link_map}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          link_map: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox id="active"
                      name="active"
                      checked={dataCestasBasicas.active}
                      onChange={(e) =>{
                        console.log(e);
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          active: e.target.checked,
                        })}
                      }>Ativa</Checkbox>
                  </Form.Item>
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="actions">
          {isFormLoading || (
            <div>
              <Button disabled={isSaveLoading} htmlType="submit">
                {isSaveLoading ? "Aguarde..." : "Salvar"}
              </Button>
              <Button disabled={isSaveLoading} onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </Form>
    </section>
  );
};
