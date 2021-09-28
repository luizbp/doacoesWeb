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
  implements ControllerRegistrationConference
{
  save(param: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<ModelRegistrationConference> {
    throw new Error("Method not implemented.");
    // const { ClassHelper } = await import("./ClassHelper");

    // // Pegando dados da tabela Company
    // const tabCompany = new ClassHelper(NameTabCompany);
    // let resultCompany: Array<ModelTabCompany> = await tabCompany.select({
    //   id,
    // });

    // // Pegando dados da tabela Entity
    // const tabEntity = new ClassHelper(NameTabEntity);
    // let resultEntity: Array<ModelTabEntity> = await tabEntity.select({
    //   id,
    // });

    // // Pegando dados da tabela Mailing
    // const tabMailing = new ClassHelper(NameTabMailing);
    // let resultMailing: Array<ModelTabMailing> = await tabMailing.select({
    //   id,
    // });

    // return {
    //   id: id,
    //   name_company: resultEntity[0].name_company,
    //   nick_trade: resultEntity[0].nick_trade,
    //   note: resultEntity[0].note,
    //   email: resultMailing[0].email,
    // };
  }

  async getList(id: string): Promise<Array<ModelTabInstitutionHasUser>> {
    const { ClassHelper } = await import("./ClassHelper");

    // Pegando dados da tabela Company
    const tabInstitutionHasUser = new ClassHelper("tb_institution_has_user");
    let resultCompany /*: Array<ModelTabInstitutionHasUser>*/ =
      await tabInstitutionHasUser.select({
        tb_institution_id: "da1f0fcb-f2b7-4e19-8063-266df6c2ee99",
        tb_user_id: "cfa00157-1326-4285-a5c9-37161e8d3064",
      });
    console.log("return DATA =-> ", resultCompany);
    return resultCompany;
  }
}
