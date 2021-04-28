class Negociacao {

    constructor(data,quantidade,valor,tipo){
        this._data = new Date(data.getTime())
        this._quantidade = quantidade
        this._valor = valor
        this._tipo = tipo
        
        Object.freeze(this)
        
    }

    get volume() {
        return this._quantidade * this._valor
    }

    get data(){
        return new Date(this._data.getTime())
        // para evitar n1.data.setData()
    }
    get quantidade(){
        return this._quantidade
    }
    get valor(){
        return this._valor
    }

    get tipo(){
        return this._tipo
    }

    isEquals(outraNegociacao) {        
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }

}