import { CheckCircleOutlined, CloseCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Skeleton, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ModelTabProduct } from "../../../../domain/Produtc/models/ModelTabProduct";
import { ModelTabInstitutionHasUser } from "../../../../domain/User/models/ModelTabInstitutionHasUser";
import { TableCards } from "../../../components/TableCards";
import { TypeFormStateListProducts } from "../types/TypeCadProductsParams";
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";
import Search from "antd/lib/input/Search";

export const FormStateListProducts = ({
  registrationProducts,
  userAuthenticator,
}: TypeFormStateListProducts) => {
  const history = useHistory()

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [dataListProducts, setDataListProducts] = useState<
    Array<ModelTabProduct>
  >([
    {
      id: '',
      identifier: '',
      tb_user_id: '',
      description: '',
      tb_category_id: '',
      tb_measure_id: '',
      active: true,
      note: '',
      link_image: '',
    },
  ]);

  const nomeColums = {
    id: 'id',
    title: 'description',
    description: 'note',
    linkImage: 'link_image',
    active: 'active'
  }

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
      render: (data) => <Link to={`/cadastro_produtos/${data.tb_institution_id}`}>Alterar</Link>,
    }
  ];

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoadingPage(true)
    const { idUser } = await userAuthenticator.getUserSession();
    const data = await registrationProducts.getList(idUser);
    setIdUser(idUser)
    setDataListProducts(data);
    setIsLoadingPage(false)
  };

  const handleNewProduct = () => {
    history.push('/cadastro_produtos/novo')
  }

  const handleEditProduct = (id: string) => {
    history.push(`/cadastro_produtos/${id}`)
  }

  const handleDeleteProduct = (id: string) => {
    swal({
      title: "Atenção",
      text: "O Produto será deletado, deseja continuar?",
      icon: "warning",
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          try {
            registrationProducts.delete(idUser, id)
            swal("Produto deletado!", {
              icon: "success",
            });
            loadData()
          } catch (error:any) {
            toast.error(error)
          }
        }
      });
  }

  const hadleSearchProduct = async (description: string) => {
    setIsLoadingSearch(true)
    const data = await registrationProducts.search(idUser, { name: 'description', value: description });
    if(data){
      setDataListProducts(data);
    }
    setIsLoadingSearch(false)
  }

  return (
    <>
      {/* TODO: Pegar o campo de limite de conferencias cadastradas ta tabela */}
      {/* TODO: Falta colocar paginação */}
      <Button disabled={dataListProducts.length >= 10} className="button-new" onClick={handleNewProduct}>
        <UserAddOutlined />
        Nova
      </Button>
      <div>
        <div className='barra-pesquisa'>
          <Search placeholder="Digite um nome para procurar" enterButton="Procurar" size="large" loading={isLoadingSearch} onSearch={hadleSearchProduct} />
        </div>
        <Skeleton loading={isLoadingPage} active>
          <TableCards
            dataSource={dataListProducts}
            nameColums={nomeColums}
            actionDelete={handleDeleteProduct}
            actionEdit={handleEditProduct} />
        </Skeleton>
      </div>
      <Toaster />
    </>
  );
};
