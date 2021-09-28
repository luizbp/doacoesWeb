import { Table } from "antd";
import { useEffect, useState } from "react";
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
      active: "",
    },
  ]);

  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    {
      title: "ID User",
      width: 100,
      dataIndex: "tb_user_id",
      key: "tb_user_id",
    },
    {
      title: "Nome Conferencia",
      width: 100,
      dataIndex: "tb_institution_id",
      key: "tb_institution_id",
    },
    {
      title: "Teste",
      width: 100,
      dataIndex: "kind",
      key: "kind",
    },
    {
      title: "Teste",
      width: 100,
      dataIndex: "active",
      key: "active",
    },
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
