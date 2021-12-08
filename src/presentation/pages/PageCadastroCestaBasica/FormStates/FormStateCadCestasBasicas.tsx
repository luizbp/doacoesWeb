import toast, { Toaster } from "react-hot-toast";
import { Form, Input, Button, Row, Col, Card, Skeleton, Select } from "antd";
import { useEffect, useState } from "react";
import { TypeFormStateCadCestasBasicas } from "../types/TypeCadCestasBasicasParams";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { ModelTabBasicBasket, SubTypeProductsBasicBasket } from "../../../../domain/Produtc/models/ModelTabBasicBasket";
import { ListProductsBasket } from "../../../components/ListProductsBasket";
import { LoadLocalStorage } from "../../../../infra/Common/LoadLocalStorage";
import { PlusOutlined } from "@ant-design/icons";

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
    Array<SubTypeProductsBasicBasket>
  >([]);
  const [infosProducts, setInfosProducts] = useState<
    Array<SubTypeProductsBasicBasket>
  >([]);

  const [selectedProduct, setSelectedProduct] = useState<Record<string, any>>({})
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (idConferencia !== "novo") {
      setIsFormLoading(true);
      try {
        await loadBasicBasket()
      } catch (erro: any) {
        toast.error(erro.message);
      }
      setIsFormLoading(false);
    }
  };

  const loadBasicBasket = async () => {
    const { idUser } = await userAuthenticator.getUserSession();
    const retorno = await registrationBasicBasket.get(
      idUser,
      idConferencia
    );
    const session = new LoadLocalStorage();
    const pInfosProducts = await session.getProducts();
    setInfosProducts(pInfosProducts);

    setDataCestasBasicas(retorno);

    if (!retorno.produtos?.length) return
    setDataProducts(retorno.produtos)
  }

  const handleExecute = async () => {
    try {
      setSaveLoading(true);
      const { idUser } = await userAuthenticator.getUserSession();
      const retorno = await registrationBasicBasket.save(
        idUser,
        idConferencia,
        {
          ...dataCestasBasicas,
          produtos: dataProducts
        }
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
        <Option key={item.id} value={item.id} measure={item.measure}>
          {item.description}
        </Option>
      );
    });
  };

  const addProduct = (product: any, quantity: number = 0) => {

    if (quantity === 0) { 
      toast.error('Quantidade inválida') 
      return 
    }

    let newValue: Array<any> = []
    let newListProducts = dataProducts.filter((item) => item.id !== product.id)

    dataProducts.map((item) => {
      if (item.id === product.id) {
        newValue.push({
          ...item,
          quantity: (item.quantity + quantity)
        })
      }
    })

    if (newValue.length)
      newListProducts = [
        ...newListProducts,
        newValue[0]
      ]
    else
      newListProducts = [
        ...newListProducts,
        {
          ...product,
          quantity
        }
      ]

    setDataProducts(newListProducts)
    setSelectedQuantity(0)
  }

  const removeProduct = (value: any) => {
    console.log('dataProducts => ', dataProducts)
    const newValue = dataProducts?.filter((item) => item.id != value.id)
    setDataProducts(newValue)
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
                  <Row>
                    <Col lg={16} md={24}>
                      <Form.Item label="Produto">
                        <Select
                          placeholder="Selecione..."
                          value={selectedProduct.id}
                          onChange={(e, { children, measure }: any) =>
                            setSelectedProduct(e ? {
                              id: e.toString(),
                              description: children,
                              measure
                            } : { id: '', description: '', measure: '' })
                          }
                        >
                          {generateOptions(infosProducts)}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={24}>
                      <Form.Item label="Quantidade">
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          value={selectedQuantity}
                          readOnly={isSaveLoading}
                          onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={24}>
                      <Form.Item label=" ">
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => addProduct(selectedProduct, selectedQuantity)} >
                          Adicionar
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <ListProductsBasket ListData={dataProducts} removeAction={removeProduct} />
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
