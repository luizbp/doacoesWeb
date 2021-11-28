export class HelperSessionStorage {
  public save(key: string, value: any) {
    try {
      sessionStorage.setItem(
        key,
        JSON.stringify({
          value,
        })
      );

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao acessar o session storage - SET");
    }
  }

  public get(key: string): any {
    try {
      const value = sessionStorage.getItem(key);

      if (!value) throw new Error("Item não encontrado");

      let valueN = JSON.parse(value);

      return valueN.value;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao acessar o session storage - GET");
    }
  }
}
