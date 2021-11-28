import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";

import './index.scss'
import { TypeArrayListProductsBasket } from "./types/Types";





export const ListProductsBasket = ( { ListData }: TypeArrayListProductsBasket) =>{
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
          title: '',
          key: 'action',
          render: (text: any, record: any) => (
            <Space size="middle">
              <a href="#" onClick={() => console.log('foi')}><CloseCircleOutlined /></a>
            </Space>
          ),
        },
      ];
    return(
        <Table className='table' columns={columns} dataSource={ListData} />
    )
}