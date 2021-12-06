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
import { LoadSessionStorage } from "../Common/LoadSessionStorage";

export class RegistrationBasicBasket
  implements ControllerRegistrationBasicBasket {
  async save(id_user: string, id_conferece: string, param: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
    // const { ClassHelper } = await import("../Common/ClassHelper");

    // if(id_conferece === 'novo'){
    //   let uuid = UUID.generate()
    //   id_conferece = uuid;

    //   // Pegando dados da tabela Entity
    //   const tabInstitution = new ClassHelper(NameTabInstitution);
    //   await tabInstitution.upsert({
    //     id: id_conferece,
    //   });
    // }

    // // Verifica se existe, se não existir coloca um novo
    

    // // Pegando dados da tabela Entity
    // const tabInstitutionHasUser = new ClassHelper(NameTabInstitutionHasUser);
    // await tabInstitutionHasUser.upsert({
    //   tb_institution_id: id_conferece,
    //   tb_user_id: id_user,
    //   kind: param.name_company,
    //   active: param.active
    // });

    // // Pegando dados da tabela Entity
    // const tabEntity = new ClassHelper(NameTabEntity);
    // await tabEntity.upsert({
    //   id: id_conferece,
    //   name_company: param.name_company,
    //   nick_trade: param.nick_trade,
    //   note: param.note,
    // });

    // // Pegando dados da tabela Mailing
    // const tabMailing = new ClassHelper(NameTabMailing);
    // await tabMailing.upsert({
    //   id: id_conferece,
    //   email: param.email
    // });

    // // Pegando dados da tabela Mailing
    // const tabPhone = new ClassHelper(NameTabPhone);
    // await tabPhone.upsert({
    //   id: id_conferece,
    //   kind: param.kind_phone,
    //   contact: param.contact,
    //   number: param.number,
    // });

    // // Pegando dados da tabela Mailing
    // const tabAddress = new ClassHelper(NameTabAddress);
    // await tabAddress.upsert({
    //   id: id_conferece,
    //   kind: param.kind_address,
    //   address: param.address,
    //   nmbr: param.nmbr,
    //   complement: param.complement,
    //   region: param.region,
    //   zip_code: param.zip_code,
    //   country: param.country,
    //   opening_hours: param.opening_hours,
    //   link_map: param.link_map,
    //   state: param.state,
    //   city: param.city
    // });

    // return true
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

    const session = new LoadSessionStorage();
    const pInfosProducts = await session.getProducts();
    

    const products = await this.buildProductList(checkFields(resultBasicBasketProduct, []), pInfosProducts)
    console.log("pInfosProducts => ", pInfosProducts)


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
