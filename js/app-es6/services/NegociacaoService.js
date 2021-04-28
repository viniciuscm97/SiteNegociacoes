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

    cadastra(negociacao){        
            
            return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociacao adicionada com sucesso')      
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possivel adicionar a negociação')
            })
        
    }

    lista(){

        return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos())
        .catch(erro => {
            console.log(erro)
            throw new Error("Não foi possível importar as negociações")
        }) 
        
    }

    apaga(){
        
        return ConnectionFactory.getConnection()
        .then( connection => new NegociacaoDao(connection))
        .then(dao => dao.apagaTodos())
        .catch(erro => {
            console.log(erro)
            throw new Error("Não foi possível apagar as negociações")
        })
        
    }

    importa(listaAtual){

        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao => 
                    !listaAtual.some( item => negociacao.isEquals(item))))                
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível apagar as negociações")
            })
    }

}