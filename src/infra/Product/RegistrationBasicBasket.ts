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


  async get(id_user: string, id_conferece: string): Promise<ModelTabBasicBasket> {
    throw new Error("Method not implemented.");
    // const { ClassHelper } = await import("../Common/ClassHelper");

    // // Pegando dados da tabela Entity
    // const tabInstitutionHasUser = new ClassHelper(NameTabInstitutionHasUser);
    // let resultInstitutionHasUser: Array<ModelTabInstitutionHasUser> = await tabInstitutionHasUser.select({
    //   tb_institution_id: id_conferece,
    //   tb_user_id: id_user
    // });

    // // Pegando dados da tabela Entity
    // const tabEntity = new ClassHelper(NameTabEntity);
    // let resultEntity: Array<ModelTabEntity> = await tabEntity.select({
    //   id: id_conferece,
    // });

    // // Pegando dados da tabela Mailing
    // const tabMailing = new ClassHelper(NameTabMailing);
    // let resultMailing: Array<ModelTabMailing> = await tabMailing.select({
    //   id: id_conferece,
    // });

    // // Pegando dados da tabela Mailing
    // const tabPhone = new ClassHelper(NameTabPhone);
    // let resultPhone: Array<ModelTabPhone> = await tabPhone.select({
    //   id: id_conferece,
    // });

    // // Pegando dados da tabela Mailing
    // const tabAddress = new ClassHelper(NameTabAddress);
    // let resultAddress: Array<ModelTabAddress> = await tabAddress.select({
    //   id: id_conferece,
    // });


    // return {
    //   id: checkFields(id_conferece, ''),
    //   active: checkFields(resultInstitutionHasUser[0]?.active, ''),
    //   tb_user_id: checkFields(id_user, ''),
    //   name_company: checkFields(resultEntity[0]?.name_company, ''),
    //   nick_trade: checkFields(resultEntity[0]?.nick_trade, ''),
    //   note: checkFields(resultEntity[0]?.note, ''),
    //   email: checkFields(resultMailing[0]?.email, ''),
    //   kind_phone: checkFields(resultPhone[0]?.kind, ''),
    //   contact: checkFields(resultPhone[0]?.contact, ''),
    //   number: checkFields(resultPhone[0]?.number, ''),
    //   kind_address: checkFields(resultAddress[0]?.kind, ''),
    //   address: checkFields(resultAddress[0]?.address, ''),
    //   nmbr: checkFields(resultAddress[0]?.nmbr, ''),
    //   complement: checkFields(resultAddress[0]?.complement, ''),
    //   region: checkFields(resultAddress[0]?.region, ''),
    //   zip_code: checkFields(resultAddress[0]?.zip_code, ''),
    //   country: checkFields(resultAddress[0]?.country, ''),
    //   opening_hours: checkFields(resultAddress[0]?.opening_hours, ''),
    //   link_map: checkFields(resultAddress[0]?.link_map, ''),
    //   state: checkFields(resultAddress[0]?.state, ''),
    //   city: checkFields(resultAddress[0]?.city, '')
    // };
  }

  async getList(id: string): Promise<Array<ModelTabBasicBasket>> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Company
    const tabBasicBasket = new ClassHelper(NameTabBasicBasketProduct);
    let resultCompany: Array<ModelTabBasicBasket> =
      await tabBasicBasket.selectGraphQL(
        {
          tb_user_id: id,
        },
        `
          id,
          quantity,
          tab_product (
            description
          )
        `
      );

    return resultCompany;
  }
}
