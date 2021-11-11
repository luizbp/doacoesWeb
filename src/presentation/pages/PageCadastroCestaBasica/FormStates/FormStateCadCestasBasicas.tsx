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
              <Card title="Informações" bordered={false}>
                <Skeleton loading={isFormLoading} active>
                  <Form.Item label="Descrição">
                    <Input
                      placeholder="Ex: Cesta Natalina..."
                      id="description"
                      name="description"
                      value={dataCestasBasicas.description}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Identificador">
                    <Input
                      placeholder="Ex: C1"
                      id="identifier"
                      name="identifier"
                      value={dataCestasBasicas.identifier}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataCestasBasicas({
                          ...dataCestasBasicas,
                          identifier: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Skeleton>
              </Card>
            </Col>
            {/* // Segundo card */}
            <Col lg={12} md={24} className="colum-card">
              <Card title="Produtos" bordered={false}>
                <Skeleton loading={isFormLoading} active>
                  <Row gutter={12}>
                    {/* <Form.Item label="Endereço">
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
                    </Form.Item> */}
                  </Row>
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
