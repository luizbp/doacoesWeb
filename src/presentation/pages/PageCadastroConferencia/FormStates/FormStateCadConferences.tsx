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
import { ModelRegistrationConference } from "../../../../domain/User/models/ModelRegistrationConference";
import { TypeFormStateCadConferences } from "../types/TypeCadastroConferenciaParams";

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
      nmbr: 0,
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
      const retorno = await registrationConference.get('');
      setDataConference(retorno);
    } catch (erro: any) {
      toast.error(erro.message);
    }
    setIsFormLoading(false);
  };

  const handleExecute = () => {};
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
                      // value={dataUser.name_company}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      // setDataUser({
                      //   ...dataUser,
                      //   name_company: e.target.value,
                      // })
                      // }
                    />
                  </Form.Item>

                  <Form.Item label="Apelido">
                    <Input
                      placeholder="Apelido"
                      id="nick_trade"
                      name="nick_trade"
                      // value={dataUser.nick_trade}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      // setDataUser({
                      //   ...dataUser,
                      //   nick_trade: e.target.value,
                      // })
                      // }
                    />
                  </Form.Item>
                  <Form.Item label="Descrição">
                    <Input.TextArea
                      placeholder="Descrição"
                      id="note"
                      name="note"
                      // value={dataUser.note}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      // setDataUser({
                      //   ...dataUser,
                      //   note: e.target.value,
                      // })
                      // }
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
                      // value={dataUser.cnpj}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      // setDataUser({
                      //   ...dataUser,
                      //   cnpj: e.target.value,
                      // })
                      // }
                    />
                  </Form.Item>
                  <Form.Item label="Inscrição estadual">
                    <Input
                      placeholder="Inscrição estadual"
                      id="ie"
                      name="ie"
                      // value={dataUser.ie}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      // setDataUser({
                      //   ...dataUser,
                      //   ie: e.target.value,
                      // })
                      // }
                    />
                  </Form.Item>
                  <Form.Item label="Inscrição municipal">
                    <Input
                      placeholder="Inscrição municipal"
                      id="im"
                      name="im"
                      // value={dataUser.im}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      //   setDataUser({
                      //     ...dataUser,
                      //     im: e.target.value,
                      //   })
                      // }
                    />
                  </Form.Item>
                  <Form.Item label="Data da fundação">
                    <Input
                      placeholder="Data da fundação"
                      id="dt_foundation"
                      name="dt_foundation"
                      // value={dataUser.dt_foundation}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      //   setDataUser({
                      //     ...dataUser,
                      //     dt_foundation: e.target.value,
                      //   })
                      // }
                    />
                  </Form.Item>
                  <Form.Item label="E-mail">
                    <Input
                      placeholder="E-mail"
                      id="email"
                      name="email"
                      // value={dataUser.email}
                      // readOnly={isSaveLoading}
                      // onChange={(e) =>
                      //   setDataUser({
                      //     ...dataUser,
                      //     email: e.target.value,
                      //   })
                      // }
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
