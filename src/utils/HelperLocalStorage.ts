export class HelperLocalStorage {
  public save(key: string, value: any) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          value,
        })
      );

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao acessar o local storage - SET");
    }
  }

  public get(key: string): any {
    try {
      const value = localStorage.getItem(key);

      if (!value) throw new Error("Item não encontrado");

      let valueN = JSON.parse(value);

      return valueN.value;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao acessar o local storage - GET");
    }
  }
}
