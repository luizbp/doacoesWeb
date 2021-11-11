import { CheckCircleOutlined, CloseCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ModelTabInstitutionHasUser } from "../../../../domain/User/models/ModelTabInstitutionHasUser";
import { RegistrationBasicBasket } from "../../../../infra/Product/RegistrationBasicBasket";
import { TypeFormStateListConferences } from "../types/TypeCadastroConferenciaParams";

export const FormStateListConferences = ({
  registrationConference,
  userAuthenticator,
}: TypeFormStateListConferences) => {
  const history = useHistory()

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);
  const [dataListConference, setDataListConference] = useState<
    Array<ModelTabInstitutionHasUser>
  >([
    {
      tb_user_id: "",
      tb_institution_id: "",
      kind: "",
      active: ""
    },
  ]);

  useEffect(() => {
    loadData()
  }, [])

  const columns: ColumnsType<ModelTabInstitutionHasUser> = [
    {
      title: "ID Conferencia",
      width: 30,
      dataIndex: "tb_institution_id",
      key: "tb_institution_id",
    },
    {
      title: "Nome Conferencia",
      width: 70,
      dataIndex: "kind",
      key: "kind",
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
      render: (data) => <Link to={`/cadastro_conferencia/${data.tb_institution_id}`}>Alterar</Link>,
    }
  ];

  const loadData = async () => {
    const { idUser } = await userAuthenticator.getUserSession();
    const data = await registrationConference.getList(idUser);
    setDataListConference(data);
  };

  const handleNewConference = () => {
    history.push('/cadastro_conferencia/novo')
  }

  return (
    <>
      {/* TODO: Pegar o campo de limite de conferencias cadastradas ta tabela */}
      <Button disabled={dataListConference.length >= 4} className="button-new" onClick={handleNewConference}>
        <UserAddOutlined />
        Nova
      </Button>
      <Table
        columns={columns}
        dataSource={dataListConference}
        scroll={{ x: 1500, y: 300 }}
      />
    </>
  );
};
