import { ControllerRegistrationUser } from "../../domain/User/controllers/ControllerRegistrationUser";
import { ModelTabCompany } from "../../domain/User/models/ModelTabCompany";

export class RegistrationUser implements ControllerRegistrationUser {
  async save(): Promise<ModelTabCompany> {
    const { TabCompany } = await import("./TabCompany");
    const tabCompany = new TabCompany();

    return tabCompany.insert({
      cnpj: "9099890890",
      dt_foundation: "2021-03-12",
      ie: "Teste",
      im: "Teste 2",
      created_at: null,
      updated_at: null,
      id: null,
    });
  }
}
