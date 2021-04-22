class ListaNegociacoes {

    constructor(){
        this._negociacoes = []
        
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao)
        
    }

    get negociacoes(){
        // para evitar alterar ou adicionar na lista fora da funciona adiciona
        return [].concat(this._negociacoes)
    }

    esvazia(){
        this._negociacoes = []

    }

    get volumeTotal(){
        return this.negociacoes.reduce((total, n) => total + n.volume , 0.0)
    }
}