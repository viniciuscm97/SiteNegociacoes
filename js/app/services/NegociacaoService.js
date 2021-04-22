class NegociacaoService {

    constructor(){
        this._http = new HttpService()
    }
    
    obterNegociacoesDaSemana(){

        return this._http.get('negociacoes/semana')
            .then(negociacoes =>  negociacoes.map(e => Factory.createNegociacao(null,{
                'date':new Date(e.data),
                'quantidade':e.quantidade,
                'valor':e.valor})))
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possivel importar negociações da semana")
            })
        
    }
    obterNegociacoesDaSemanaAnterior(){

        return this._http.get('negociacoes/anterior')
            .then(negociacoes =>  negociacoes.map(e => Factory.createNegociacao(null,{
                'date':new Date(e.data),
                'quantidade':e.quantidade,
                'valor':e.valor})))
            .catch(erro => {
                console.log(erro)
                throw new Error( "Não foi possivel obter as negociações da semana anterior")
            })

                 
    }

    obterNegociacoesDaSemanaRetrasada(){

        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => negociacoes.map(e => Factory.createNegociacao(null,{
                'date':new Date(e.data),
                'quantidade':e.quantidade,
                'valor':e.valor})))
            .catch(erro => {
                console.log(erro)
                throw new Error( "Não foi possivel obter as negociações da semana retrasada")
            })
               
    }

    obterNegociacoes(){
        return Promise.all(
            [this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()])
            .then( negociacoes => {
                let todasNegociacoes = negociacoes.reduce((arrayAchatado,arrayAtual) => arrayAchatado.concat(arrayAtual), [])
                return todasNegociacoes})
            .catch( erro => {throw new Error(erro)})
    }

}