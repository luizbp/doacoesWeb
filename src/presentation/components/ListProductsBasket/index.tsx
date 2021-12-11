import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import './index.scss'
import { TypeArrayListProductsBasket, TypeListProductsBasket } from "./types/Types";





export const ListProductsBasket = ( { ListData, removeAction}: TypeArrayListProductsBasket) =>{

    const [data, setData] = useState<Array<TypeListProductsBasket>>([])

    useEffect(() => {
      _loadList()
    }, [ListData])

    const _loadList = () => {
      setData(ListData)
    }

    
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: 'Descrição',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Quantidade',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Un. Medida',
          dataIndex: 'measure',
          key: 'measure',
        },
        {
          title: '',
          key: 'action',
          render: (text: any, item: any) => (
            <Space size="middle">
              <a href="#" onClick={() => removeAction(item)}><CloseCircleOutlined /></a>
            </Space>
          ),
        },
      ];
    return(
        <Table rowKey="id" className='table' columns={columns} dataSource={data} />
    )
}