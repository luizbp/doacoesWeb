import { ModelTabBasicBasketProduct } from "./ModelTabBasicBasketProduct";

export type ModelTabBasicBasket = {
    id: string
    identifier: string
    tb_user_id: string
    description: string
    active: boolean
    produtos?: Array<ModelTabBasicBasketProduct>
    created_at?: string
    updated_at?: string
}