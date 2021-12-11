import { KEY_MEASURES_SESSION, KEY_PRODUCTS_SESSION } from "../../domain/Common/variables/SessionVariables";
import { HelperLocalStorage } from "../../utils/HelperLocalStorage";
import { RegistrationProducts } from "../Product/RegistrationProducts";

export class LoadLocalStorage {
  private helperSession: any

  constructor() {
    this.helperSession = new HelperLocalStorage();
  }

  public loadProducts = async (id_user: string) => {
    //SALVA OS PRODUTOS NO SESSION STORAGE
    const registrationProducts = new RegistrationProducts();
    const listProducts = await registrationProducts.getList(id_user);
    await this.loadMeasures(id_user)
    const listMeasures = await this.getMeasures();
    let listSave: any = []

    listProducts.map((e) => {
      let measure = listMeasures.filter((value: any) => value.id === e.tb_measure_id)
      
      listSave.push({
        id: e.id,
        description: e.description,
        quantity: 0,
        measure: measure[0].description
      })
    })

    this.helperSession.save(KEY_PRODUCTS_SESSION, listSave);
  };

  public getProducts = async () => {
    //SALVA OS PRODUTOS NO SESSION STORAGE
    return this.helperSession.get(KEY_PRODUCTS_SESSION);
  };

  public loadMeasures = async (id_user: string) => {
    //SALVA OS PRODUTOS NO SESSION STORAGE
    const registrationProducts = new RegistrationProducts();
    const listMeasures = await registrationProducts.getMeadures();
    let listSave: any = []

    listMeasures.map((e) => {
      listSave.push({
        id: e.id,
        description: e.description
      })
    })
    this.helperSession.save(KEY_MEASURES_SESSION, listSave);
  };

  public getMeasures = async () => {
    //SALVA OS PRODUTOS NO SESSION STORAGE
    return this.helperSession.get(KEY_MEASURES_SESSION);
  };
}
