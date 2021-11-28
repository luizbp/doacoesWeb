import { KEY_PRODUCTS_SESSION } from "../../domain/Common/variables/SessionVariables";
import { HelperSessionStorage } from "../../utils/HelperSessionStorage";
import { RegistrationProducts } from "../Product/RegistrationProducts";

export class LoadSessionStorage {
  private helperSession: any

  constructor() {
    this.helperSession = new HelperSessionStorage();
  }

  public loadProducts = async (id_user: string) => {
    //SALVA OS PRODUTOS NO SESSION STORAGE
    const registrationProducts = new RegistrationProducts();
    const listProducts = await registrationProducts.getList(id_user);
    this.helperSession.save(KEY_PRODUCTS_SESSION, listProducts);
  };

  public getProducts = async () => {
    //SALVA OS PRODUTOS NO SESSION STORAGE
    return this.helperSession.get(KEY_PRODUCTS_SESSION);
  };
}
