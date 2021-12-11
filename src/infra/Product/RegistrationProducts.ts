import UUID from "uuidjs";

import {
  NameTabCategory,
  NameTabMeasure,
  NameTabProduct,
} from "../../domain/Common/variables/NameTabs";
import { ControllerRegistrationProducts } from "../../domain/Produtc/controller/ControllerRegistrationProducts";
import { ModelTabCategory } from "../../domain/Produtc/models/ModelTabCategory";
import { ModelTabMeasure } from "../../domain/Produtc/models/ModelTabMeasure";
import { ModelTabProduct } from "../../domain/Produtc/models/ModelTabProduct";

import { ModelRegistrationConference } from "../../domain/User/models/ModelRegistrationConference";
import { checkFields } from "../Common/checkFilds";

export class RegistrationProducts implements ControllerRegistrationProducts {
  async save(
    id_user: string,
    id_product: string,
    param: Record<string, any>
  ): Promise<boolean> {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("../Common/ClassHelper");

    if (id_product === "novo") {
      let uuid = UUID.generate();
      id_product = uuid;
    }

    // Pegando dados da tabela Entity
    const tabProduct = new ClassHelper(NameTabProduct);
    await tabProduct.upsert({
      id: id_product,
      identifier: param.identifier,
      tb_user_id: id_user,
      description: param.description,
      tb_category_id: param.tb_category_id,
      tb_measure_id: param.tb_measure_id,
      active: param.active,
      note: param.note,
      link_image: param.link_image,
    });

    return true;
  }

  async get(id_user: string, id_product: string): Promise<ModelTabProduct> {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Entity
    const tabProduct = new ClassHelper(NameTabProduct);
    let resultTabProduct: Array<ModelTabProduct> = await tabProduct.select({
      id: id_product,
      tb_user_id: id_user,
    });

    return {
      id: checkFields(resultTabProduct[0]?.id, ""),
      identifier: checkFields(resultTabProduct[0]?.identifier, ""),
      tb_user_id: checkFields(resultTabProduct[0]?.tb_user_id, ""),
      description: checkFields(resultTabProduct[0]?.description, ""),
      tb_category_id: checkFields(resultTabProduct[0]?.tb_category_id, ""),
      tb_measure_id: checkFields(resultTabProduct[0]?.tb_measure_id, ""),
      active: checkFields(resultTabProduct[0]?.active, ""),
      note: checkFields(resultTabProduct[0]?.note, ""),
      link_image: checkFields(resultTabProduct[0]?.link_image, ""),
    };
  }

  async delete(id_user: string, id_product: string): Promise<boolean> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Entity
    const tabProduct = new ClassHelper(NameTabProduct);
    let resultTabProduct: boolean = await tabProduct.delete({
      id: id_product,
      tb_user_id: id_user,
    });

    return resultTabProduct;
  }

  async getList(id_user: string): Promise<Array<ModelTabProduct>> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Company
    const tabProduct = new ClassHelper(NameTabProduct);
    let resultCompany: Array<ModelTabProduct> = await tabProduct.select({
      tb_user_id: id_user,
    });

    return resultCompany;
  }

  async getMeadures(id?: string, id_user?: string) {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Entity
    const tabMeasure = new ClassHelper(NameTabMeasure);
    let resultTabMeasure: Array<ModelTabMeasure> = id
      ? await tabMeasure.select({
          id,
          tb_user_id: id_user,
        })
      : await tabMeasure.select();

    return resultTabMeasure;
  }

  async getCategory(id?: string, id_user?: string) {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Entity
    const tabCategory = new ClassHelper(NameTabCategory);
    let resultTabCategory: Array<ModelTabCategory> = id
      ? await tabCategory.select({
          id,
          tb_user_id: id_user,
        })
      : await tabCategory.select();

    return resultTabCategory;
  }

  async search(
    id_user: string,
    params: { name: string; value: any }
  ): Promise<Array<ModelTabProduct>> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Company
    const tabProduct = new ClassHelper(NameTabProduct);
    let resultProduct: Array<ModelTabProduct> = await tabProduct.search({ tb_user_id: id_user }, params)

    return resultProduct;
  }
}
