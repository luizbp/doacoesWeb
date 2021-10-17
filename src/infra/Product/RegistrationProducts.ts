import UUID from "uuidjs";

import {
  NameTabProduct,
} from "../../domain/Common/variables/NameTabs";
import { ControllerRegistrationProducts } from "../../domain/Produtc/controller/ControllerRegistrationProducts";
import { ModelTabProduct } from "../../domain/Produtc/models/ModelTabProduct";

import { ModelRegistrationConference } from "../../domain/User/models/ModelRegistrationConference";
import { checkFields } from "../Common/checkFilds";

export class RegistrationProducts
  implements ControllerRegistrationProducts {
  async save(id_user: string, id_product: string, param: Record<string, any>): Promise<boolean> {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("../Common/ClassHelper");

    if(id_product === 'novo'){
      let uuid = UUID.generate()
      id_product = uuid;
    }
    

    // Pegando dados da tabela Entity
    const tabProduct = new ClassHelper(NameTabProduct);
    await tabProduct.upsert({
      id: id_product,
      identifier: param.identifier,
      tb_user_id: param.tb_user_id,
      description: param.description,
      tb_category_id: param.tb_category_id,
      tb_measure_id: param.tb_measure_id,
      active: param.active,
      note: param.note,
      link_image: param.link_image,
    });

    return true
  }


  async get(id_user: string, id_product: string): Promise<ModelTabProduct> {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Entity
    const tabProduct = new ClassHelper(NameTabProduct);
    let resultTabProduct: Array<ModelTabProduct> = await tabProduct.select({
      id: id_product,
      tb_user_id: id_user
    });


    return {
      id: checkFields(resultTabProduct[0]?.id, ''),
      identifier: checkFields(resultTabProduct[0]?.identifier, ''),
      tb_user_id: checkFields(resultTabProduct[0]?.tb_user_id, ''),
      description: checkFields(resultTabProduct[0]?.description, ''),
      tb_category_id: checkFields(resultTabProduct[0]?.tb_category_id, ''),
      tb_measure_id: checkFields(resultTabProduct[0]?.tb_measure_id, ''),
      active: checkFields(resultTabProduct[0]?.active, ''),
      note: checkFields(resultTabProduct[0]?.note, ''),
      link_image: checkFields(resultTabProduct[0]?.link_image, ''),
    };
  }

  async delete(id_user: string, id_product: string): Promise<boolean> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Entity
    const tabProduct = new ClassHelper(NameTabProduct);
    let resultTabProduct: boolean = await tabProduct.delete({
      id: id_product,
      tb_user_id: id_user
    });

    return resultTabProduct;
  }

  async getList(id: string): Promise<Array<ModelTabProduct>> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Company
    const tabProduct = new ClassHelper(NameTabProduct);
    let resultCompany: Array<ModelTabProduct> =
      await tabProduct.select({
        tb_user_id: id,
      });

    return resultCompany;
  }
}
