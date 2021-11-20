import { KEY_PRODUCTS_SESSION } from "../../domain/Common/variables/SessionVariables";
import { HelperSessionStorage } from "../../utils/HelperSessionStorage";
import { RegistrationProducts } from "../Product/RegistrationProducts";


export const loadSessionStoraga = async (id_user: string) => {
    const helperSession = new HelperSessionStorage()

    //SALVA OS PRODUTOS NO SESSION STORAGE
    const registrationProducts = new RegistrationProducts();
    const listProducts = await registrationProducts.getList(id_user)
    helperSession.save(KEY_PRODUCTS_SESSION, listProducts)
}