import toast, { Toaster } from "react-hot-toast";
import { Form, Input, Button, Row, Col, Card, Skeleton, Select } from "antd";
import { useEffect, useState } from "react";
import { TypeFormStateCadCestasBasicas } from "../types/TypeCadCestasBasicasParams";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { ModelTabBasicBasket } from "../../../../domain/Produtc/models/ModelTabBasicBasket";
import { ListProductsBasket } from "../../../components/ListProductsBasket";
import { TypeListProductsBasket } from "../../../components/ListProductsBasket/types/Types";
import { LoadSessionStorage } from "../../../../infra/Common/LoadSessionStorage";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

export const FormStateCadCestasBasicas = ({
  registrationBasicBasket,
  userAuthenticator,
  idConferencia,
}: TypeFormStateCadCestasBasicas) => {
  const history = useHistory();

  // Responsavel por informar se o form esta em carregamento
  const [isFormLoading, setIsFormLoading] = useState(false);
  // Responsável por informar se o form está sendo gravado
  const [isSaveLoading, setSaveLoading] = useState(false);
  // Informações da cesta básica
  const [dataCestasBasicas, setDataCestasBasicas] =
    useState<ModelTabBasicBasket>({
      id: "",
      active: true,
      description: "",
      identifier: "",
      produtos: [],
      tb_user_id: "",
    });

  const [dataProducts, setDataProducts] = useState<
    Array<TypeListProductsBasket>
  >([]);
  const [infosProducts, setInfosProducts] = useState<
    Array<TypeListProductsBasket>
  >([]);

  const [selectedProduct, setSelectedProduct] = useState<string>('')

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (idConferencia !== "novo") {
      setIsFormLoading(true);
      try {
        const { idUser } = await userAuthenticator.getUserSession();
        const retorno = await registrationBasicBasket.get(
          idUser,
          idConferencia
        );
        setDataCestasBasicas(retorno);

        //Carrega informações dos produtos
        const session = new LoadSessionStorage();
        const pInfosProducts = await session.getProducts();
        setInfosProducts(pInfosProducts);
        const listProducts: any = [];

        retorno.produtos?.forEach((e) => {
          let description = pInfosProducts.filter(
            (value: any) => {
              return (value.id === e.tb_product_id)
            }
          )[0].description;
          listProducts.push({
            id: e.tb_product_id,
            description,
          });
        });

        setDataProducts(listProducts)

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
      const retorno = await registrationBasicBasket.save(
        idUser,
        idConferencia,
        dataCestasBasicas
      );
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
      buttons: ["Cancelar", true],
    }).then(async (willDelete) => {
      if (willDelete) {
        history.go(-1);
      }
    });
  };

  const generateOptions = (value: any) => {
    return value.map((item: any) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.description}
        </Option>
      );
    });
  };


  const addProduct = (value: any) => {

  }

  const removeProduct = (value: any) => {

  }

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
                  <Form.Item>
                    <Row>
                      <Col lg={20} md={24}>
                        <Select
                          placeholder="Selecione..."
                          value={selectedProduct}
                          onChange={(e) =>
                            setSelectedProduct(e ? e.toString() : "")
                          }
                        >
                          {generateOptions(infosProducts)}
                        </Select>
                      </Col>
                      <Col lg={4} md={24}>
                        <Button type="primary" icon={<CheckCircleOutlined />} >
                          Adicionar
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Row>
                    <ListProductsBasket ListData={dataProducts} />
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
