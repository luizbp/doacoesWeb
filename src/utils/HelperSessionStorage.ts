export class HelperSessionStorage{
    public save(key: string, value: any){

        try{
            let valueN

            if(typeof value === 'object'){
                valueN = JSON.stringify(value)
            }else{
                valueN = value
            }

            sessionStorage.setItem(key, valueN)

            return true
        }catch (error){
            console.error(error)
            throw new Error('Erro ao acessar o session storage - SET');
        }
    }


    public get(key:string):any{
        try{

            const value = sessionStorage.getItem(key)

            if(!value) throw new Error("Item não encontrado");

            let valueN

            if(typeof value === 'object'){
                valueN = JSON.parse(value)
            }else{
                valueN = value
            }

            return valueN

        }catch (error){
            console.error(error)
            throw new Error('Erro ao acessar o session storage - GET');
        }
    }
}