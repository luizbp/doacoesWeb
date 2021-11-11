import { CheckCircleOutlined, CloseCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ModelTabBasicBasket } from "../../../../domain/Produtc/models/ModelTabBasicBasket";
import { RegistrationBasicBasket } from "../../../../infra/Product/RegistrationBasicBasket";
import { TypeFormStateListCestasBasicas } from "../types/TypeCadCestasBasicasParams";

export const FormStateListCestasBasicas = ({
  registrationBasicBasket,
  userAuthenticator,
}: TypeFormStateListCestasBasicas) => {
  const history = useHistory()

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);
  const [dataListBasicBasket, setDataListBasicBasket] = useState<
    Array<ModelTabBasicBasket>
  >([
    {
      id: '',
      description: '',
      identifier: '',
      tb_user_id: '',
      active: true
    },
  ]);

  useEffect(() => {
    loadData()
  }, [])

  const columns: ColumnsType<ModelTabBasicBasket> = [
    {
      title: "ID",
      width: 30,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descrição Cesta Básica",
      width: 70,
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ativa",
      width: 30,
      dataIndex: "active",
      key: "active",
      align: 'center',
      render: (data) => {
        if (data)
          return <CheckCircleOutlined twoToneColor="#52c41a" size={32} />
        else
          return <CloseCircleOutlined twoToneColor="#eb2f96" size={32} />
      },
    },
    {
      title: 'Ações',
      key: 'operation',
      fixed: 'right',
      width: 10,
      align: 'center',
      render: (data) => <Link to={`/cadastro_cesta_basica/${data.id}`}>Alterar</Link>,
    }
  ];

  const loadData = async () => {
    const { idUser } = await userAuthenticator.getUserSession();
    const data = await registrationBasicBasket.getList(idUser);
    setDataListBasicBasket(data);


    // Só pra teste
    const teste = new RegistrationBasicBasket()
    let retorno = await teste.getList(idUser)
    console.log('TESTE RETORNO => ', retorno)
  };

  const handleNewBasicBasket = () => {
    history.push('/cadastro_cesta_basica/novo')
  }

  return (
    <>
      {/* TODO: Pegar o campo de limite de conferencias cadastradas ta tabela */}
      <Button disabled={dataListBasicBasket.length >= 4} className="button-new" onClick={handleNewBasicBasket}>
        <UserAddOutlined />
        Nova
      </Button>
      <Table
        columns={columns}
        dataSource={dataListBasicBasket}
        scroll={{ x: 1500, y: 300 }}
      />
    </>
  );
};
