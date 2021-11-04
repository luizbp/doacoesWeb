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
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { TypeFormStateCadProducts } from "../types/TypeCadProductsParams";
import { MaskedInput } from "antd-mask-input";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { ModelTabProduct } from "../../../../domain/Produtc/models/ModelTabProduct";
import { RedoOutlined } from "@ant-design/icons";
import { ModelTabMeasure } from "../../../../domain/Produtc/models/ModelTabMeasure";
import { ModelTabCategory } from "../../../../domain/Produtc/models/ModelTabCategory";

const { Option } = Select;

export const FormStateCadProducts = ({
  registrationProducts, userAuthenticator, idConferencia
}: TypeFormStateCadProducts) => {

  const history = useHistory();
  
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);
  const [linkPreviewImagem, setLinkPreviewImagem] = useState('');
  const [measures, setMeasures] = useState<Array<ModelTabMeasure>>([]);
  const [category, setCategory] = useState<Array<ModelTabCategory>>([]);

  const [dataProducts, setDataProducts] =
    useState<ModelTabProduct>({
      id: '',
      identifier: '',
      tb_user_id: '',
      description: '',
      tb_category_id: '',
      tb_measure_id: '',
      active: true,
      note: '',
      link_image: '',
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsFormLoading(true);
    const measures = await registrationProducts.getMeadures();
    const category = await registrationProducts.getCategory();

    setCategory(category)
    setMeasures(measures)

    if(idConferencia !== 'novo'){
      try {
        const { idUser } = await userAuthenticator.getUserSession();
        const retorno = await registrationProducts.get(idUser, idConferencia);

        setDataProducts(retorno);
        setLinkPreviewImagem(retorno.link_image)
      } catch (erro: any) {
        toast.error(erro.message);
      }
    }
    setIsFormLoading(false);
  };

  const handleExecute = async () => {
    try {
      setSaveLoading(true);
      const { idUser } = await userAuthenticator.getUserSession();
      const retorno = await registrationProducts.save(idUser, idConferencia, dataProducts);
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
      title: 'Atenção!',
      text: "Todos os dados não salvos seram perdidos?",
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
              <Card title="Informações cadastrais" bordered={false}>
                <Skeleton loading={isFormLoading} active>
                  <Form.Item label="Descrição">
                    <Input
                      placeholder="Ex: Arroz"
                      id="description"
                      name="description"
                      value={dataProducts.description}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataProducts({
                          ...dataProducts,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Unidade de medida">
                    <Select
                        style={{ width: 200 }}
                        placeholder="Selecione..."
                        value={dataProducts.tb_measure_id}
                        onChange={(e) =>
                          setDataProducts({
                            ...dataProducts,
                            tb_measure_id: e ? e.toString() : '',
                          })
                        }
                      >
                        {measures.map((value) => {
                          return (
                            <Option key={value.id} value={value.id}>{value.description}</Option>
                          )
                        })}
                      </Select>
                  </Form.Item>
                  <Form.Item label="Categoria">
                    <Select
                      style={{ width: 200 }}
                      placeholder="Selecione..."
                      value={dataProducts.tb_category_id}
                      onChange={(e) =>
                        setDataProducts({
                          ...dataProducts,
                          tb_category_id: e ? e.toString() : '',
                        })
                      }
                    >
                      {category.map((value) => {
                        return (
                          <Option key={value.id} value={value.id}>{value.description}</Option>
                        )
                      })}
                    </Select>,
                  </Form.Item>
                  <Form.Item label="Observação">
                    <Input.TextArea
                      placeholder="Ex: Verificar validade, verificar embalagem..."
                      id="note"
                      name="note"
                      value={dataProducts.note}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataProducts({
                          ...dataProducts,
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
              <Card title="Informações visuais" bordered={false}>
                <Skeleton loading={isFormLoading} active>
                  <Row>
                    <img src={linkPreviewImagem} alt="" />
                  </Row>
                  <Form.Item label="Complemento">
                    <Input
                      placeholder="Ex: Prédio"
                      id="complement"
                      name="complement"
                      value={dataProducts.link_image}
                      readOnly={isSaveLoading}
                      onChange={(e) =>
                        setDataProducts({
                          ...dataProducts,
                          link_image: e.target.value,
                        })
                      }
                    />
                    <Button onClick={() => setLinkPreviewImagem(dataProducts.link_image)}><RedoOutlined /> Atulizar previa</Button>
                  </Form.Item>
                  <Form.Item>
                    <Checkbox id="active"
                      name="active"
                      checked={dataProducts.active}
                      onChange={(e) =>{
                        console.log(e);
                        setDataProducts({
                          ...dataProducts,
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
