import UUID from "uuidjs";

import { ModelTabBasicBasket } from "../../domain/Produtc/models/ModelTabBasicBasket";
import { ModelTabBasicBasketProduct } from "../../domain/Produtc/models/ModelTabBasicBasketProduct";
import { ModelTabProduct } from "../../domain/Produtc/models/ModelTabProduct";

import {
  NameTabBasicBasket,
  NameTabBasicBasketProduct,
  NameTabProduct,
} from "../../domain/Common/variables/NameTabs";
import { ControllerRegistrationBasicBasket } from "../../domain/Produtc/controller/ControllerRegistrationBasicBasket";

import { checkFields } from "../Common/checkFilds";
import { LoadLocalStorage } from "../Common/LoadLocalStorage";

export class RegistrationBasicBasket
  implements ControllerRegistrationBasicBasket {
  async save(id_user: string, tb_basic_basket_id: string, param: ModelTabBasicBasket): Promise<boolean> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    if(tb_basic_basket_id === 'novo'){
      let uuid = UUID.generate()
      tb_basic_basket_id = uuid;
    }

    // Pegando dados da tabela Entity
    const tabBasicBasket = new ClassHelper(NameTabBasicBasket);
    await tabBasicBasket.upsert({
      id: tb_basic_basket_id,
      tb_user_id: id_user,
      description: param.description,
      identifier: param.identifier,
      active: param.active
    });

    if (!param.produtos || !param.produtos.length) return true
    const productsInsert: any = []
    param.produtos.forEach((prod) => {
      productsInsert.push({
        tb_product_id: prod.id,
        tb_basic_basket_id,
        tb_user_id: id_user,
        quantity: prod.quantity,
        active: true
      })
    })
    

    // Pegando dados da tabela Entity
    const tabBasicBasketProduct = new ClassHelper(NameTabBasicBasketProduct);
    await tabBasicBasketProduct.delete({
      tb_basic_basket_id
    })
    await tabBasicBasketProduct.insertInBulk(productsInsert);
    return true
  }

  async get(id_user: string, id_basic_basket: string): Promise<ModelTabBasicBasket> {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Mailing
    const tabBasicBasket = new ClassHelper(NameTabBasicBasket);
    let resultBasicBasket: Array<ModelTabBasicBasket> = await tabBasicBasket.select({
      id: id_basic_basket,
    });

    // Pegando dados da tabela Mailing
    const tabBasicBasketProduct = new ClassHelper(NameTabBasicBasketProduct);
    let resultBasicBasketProduct: Array<ModelTabBasicBasketProduct> = await tabBasicBasketProduct.select({
      tb_basic_basket_id: id_basic_basket,
    });

    const session = new LoadLocalStorage();
    const pInfosProducts = await session.getProducts();
    const products = await this.buildProductList(checkFields(resultBasicBasketProduct, []), pInfosProducts)

    return {
      id: checkFields(resultBasicBasket[0].id, ''),
      description: checkFields(resultBasicBasket[0].description, ''),
      active: checkFields(resultBasicBasket[0].active, ''),
      identifier: checkFields(resultBasicBasket[0].identifier, ''),
      tb_user_id: checkFields(resultBasicBasket[0].tb_user_id, ''),
      produtos: products,
    };
  }

  async getList(id: string): Promise<Array<ModelTabBasicBasket>> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Company
    const tabBasicBasket = new ClassHelper(NameTabBasicBasket);
    let resultCompany: Array<ModelTabBasicBasket> =
      await tabBasicBasket.select({
        tb_user_id: id,
      });

    return resultCompany;
  }

  private buildProductList = async (listIds:any, products: any) => {    
    
    if(!listIds.length || !products.length) return []

    let listReturn: any = []
    listIds.forEach((op: any) => {
      let product = products.filter((value: any) => value.id === op.tb_product_id)

      listReturn.push({
        id: op.tb_product_id,
        description: product[0].description,
        quantity: op.quantity,
        measure: product[0].measure
      });
    });

    return listReturn
  }
}
