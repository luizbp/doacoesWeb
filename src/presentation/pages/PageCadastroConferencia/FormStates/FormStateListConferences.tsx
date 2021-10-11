import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModelTabInstitutionHasUser } from "../../../../domain/User/models/ModelTabInstitutionHasUser";
import { TypeFormStateListConferences } from "../types/TypeCadastroConferenciaParams";

export const FormStateListConferences = ({
  registrationConference,
  userAuthenticator,
}: TypeFormStateListConferences) => {
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
      width: 100,
      dataIndex: "tb_institution_id",
      key: "tb_institution_id",
    },
    {
      title: "Nome Conferencia",
      width: 100,
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
          return <CheckCircleOutlined twoToneColor="#52c41a" size={32}/>
        else
          return <CloseCircleOutlined twoToneColor="#eb2f96" size={32}/>
      },
    },
    {
      title: 'Ações',
      key: 'operation',
      fixed: 'right',
      width: 30,
      align: 'center',
      render: (data) => <Link to={`/cadastro_conferencia/${data.tb_institution_id}`}>Alterar</Link>,
    }
  ];

  const loadData = async () => {
    const { idUser } = await userAuthenticator.getUserSession();
    const data = await registrationConference.getList(idUser);
    setDataListConference(data);
  };

  return (
    <Table
      columns={columns}
      dataSource={dataListConference}
      scroll={{ x: 1500, y: 300 }}
    />
  );
};
