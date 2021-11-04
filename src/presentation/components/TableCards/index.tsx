import { Card } from "antd"
import Meta from "antd/lib/card/Meta"
import { TypeParamsTableCards } from "./types/TypeParamsTableCards"

import './index.scss'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"




export const TableCards = ({ nameColums, dataSource, actionDelete, actionEdit }: TypeParamsTableCards) => {
    return (
        <section className='table-card'>
            <div className='body'>
                {dataSource.map((value) => {
                    return (
                        <div className='card' key={value[nameColums.id]}>
                            <div className='status'>
                                {value[nameColums.active] ? <span className='enable'>Ativo</span> : <span className='disable'>Inativo</span>

                                }
                            </div>
                            <figure>
                                <img alt={value[nameColums.title]} src={value[nameColums.linkImage]} />
                            </figure>
                            <div className="description">
                                <Meta title={value[nameColums.title]} description={value[nameColums.description]} />
                            </div>
                            <EditOutlined className='button-edit' title='Editar' alt='Editar' onClick={() => {
                                actionEdit(value[nameColums.id])
                            }} />
                            <DeleteOutlined className='button-delete' title='Deletar' alt='Deletar' onClick={() => {
                                actionDelete(value[nameColums.id])
                            }} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}