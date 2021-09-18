import { ControllerRegistrationUser } from "../../domain/User/controllers/ControllerRegistrationUser";
import { ModelTabCompany } from "../../domain/User/models/ModelTabCompany";

export class RegistrationUser implements ControllerRegistrationUser {
  async save(): Promise<Array<ModelTabCompany>> {
    const { TabCompany } = await import("./TabCompany");
    const tabCompany = new TabCompany();

    return tabCompany.select()
  }

  async save2(): Promise<boolean> {
    const { TabCompany } = await import("./TabCompany");
    const tabCompany = new TabCompany();

    return tabCompany.delete('305f1f65-ef18-499f-aa2c-191484e45a1b')
  }
}
