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
}