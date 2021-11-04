import { ControllerRegistrationUser } from "../../domain/User/controllers/ControllerRegistrationUser";
import { ModelTabCompany } from "../../domain/User/models/ModelTabCompany";
import {
  NameTabCompany,
  NameTabEntity,
  NameTabMailing,
} from "../../domain/Common/variables/NameTabs";
import { ModelRegistrationUser } from "../../domain/User/models/ModelRegistrationUser";
import { ModelTabEntity } from "../../domain/Common/models/ModelTabEntity";
import { ModelTabMailing } from "../../domain/Common/models/ModelTabMailing";

export class RegistrationUser implements ControllerRegistrationUser {
  async save(param: ModelRegistrationUser): Promise<boolean> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    const tabCompany = new ClassHelper(NameTabCompany);
    const dataCompany: ModelTabCompany = {
      id: param.id,
      cnpj: param.cnpj,
      ie: param.ie,
      im: param.im,
      dt_foundation: param.dt_foundation,
    };
    await tabCompany.upsert(dataCompany);

    const tabEntity = new ClassHelper(NameTabEntity);
    const dataEntity: ModelTabEntity = {
      id: param.id,
      name_company: param.name_company,
      nick_trade: param.nick_trade,
      note: param.note,
    };
    await tabEntity.upsert(dataEntity);

    const tabMailing = new ClassHelper(NameTabMailing);
    const dataMailing: ModelTabMailing = {
      id: param.id,
      email: param.email,
    };
    await tabMailing.upsert(dataMailing);

    return true;
  }

  async get(id: string): Promise<ModelRegistrationUser> {
    const { ClassHelper } = await import("../Common/ClassHelper");

    // Pegando dados da tabela Company
    const tabCompany = new ClassHelper(NameTabCompany);
    let resultCompany: Array<ModelTabCompany> = await tabCompany.select({
      id,
    });

    // Pegando dados da tabela Entity
    const tabEntity = new ClassHelper(NameTabEntity);
    let resultEntity: Array<ModelTabEntity> = await tabEntity.select({
      id,
    });

    // Pegando dados da tabela Mailing
    const tabMailing = new ClassHelper(NameTabMailing);
    let resultMailing: Array<ModelTabMailing> = await tabMailing.select({
      id,
    });

    return {
      id: id,
      name_company: resultEntity[0].name_company,
      nick_trade: resultEntity[0].nick_trade,
      note: resultEntity[0].note,
      cnpj: resultCompany[0].cnpj,
      ie: resultCompany[0].ie,
      im: resultCompany[0].im,
      dt_foundation: resultCompany[0].dt_foundation,
      email: resultMailing[0].email,
    };
  }
}
