import { ModelTabEntity } from "../../domain/Common/models/ModelTabEntity";
import { ModelTabMailing } from "../../domain/Common/models/ModelTabMailing";
import {
  NameTabEntity,
  NameTabInstitutionHasUser,
  NameTabMailing,
} from "../../domain/Common/variables/NameTabs";
import { ControllerRegistrationConference } from "../../domain/User/controllers/ControllerRegistrationConference";
import { ModelRegistrationConference } from "../../domain/User/models/ModelRegistrationConference";
import { ModelTabInstitutionHasUser } from "../../domain/User/models/ModelTabInstitutionHasUser";

export class RegistrationConference
  implements ControllerRegistrationConference {
  save(param: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<ModelRegistrationConference> {
    // throw new Error("Method not implemented.");
    const { ClassHelper } = await import("./ClassHelper");

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
      id: "",
      tb_user_id: "",
      name_company: "",
      nick_trade: "",
      note: "",
      email: "",
      kind_phone: "",
      contact: "",
      number: "",
      address_kind: "",
      kind_address: "",
      address: "",
      nmbr: "",
      complement: "",
      region: "",
      zip_code: "",
      country: "",
      opening_hours: "",
      link_map: "",
      state: "",
      city: "",
      created_at: "",
      updated_at: "",
    };
  }

  async getList(id: string): Promise<Array<ModelTabInstitutionHasUser>> {
    const { ClassHelper } = await import("./ClassHelper");

    // Pegando dados da tabela Company
    const tabInstitutionHasUser = new ClassHelper("tb_institution_has_user");
    let resultCompany: Array<ModelTabInstitutionHasUser> =
      await tabInstitutionHasUser.select({
        tb_user_id: id,
      });

    return resultCompany;
  }
}
