class View {
    
    constructor(elemento){
        this._elemento = elemento;
    }
    // se a classe extends não tiver _template isso vai ser implementado, se tiver vai
    // ser reescrito
    template() {
        throw new Error("O método template deve ser implementado")
    }

    update(model){
        this._elemento.innerHTML = this.template(model)
    }
}