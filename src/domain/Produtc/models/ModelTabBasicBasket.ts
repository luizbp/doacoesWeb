import { ModelTabBasicBasketProduct } from "./ModelTabBasicBasketProduct";

export type ModelTabBasicBasket = {
    id: string
    identifier: string
    tb_user_id: string
    description: string
    active: boolean
    produtos?: Array<SubTypeProductsBasicBasket>
    created_at?: string
    updated_at?: string
}


export type SubTypeProductsBasicBasket = {
    id: string
    description: string
    quantity: number,
    measure: string
}