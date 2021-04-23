class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputQuantidade = $('#quantidade')
        this._inputData = $('#data')
        this._inputValor = $('#valor')
        this._inputTipo = document.querySelectorAll('#tipo')

        this._ordemAtual = '';
    
    
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia', 'ordena', 'inverteOrdem')

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        )
             
        
    }

    adiciona(event){        
        event.preventDefault()

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let negociacao = this.criaNegociacao()

                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {

                        this._listaNegociacoes.adiciona(negociacao)
                        this._mensagem.texto = 'Negociacao adicionada com sucesso'
                        this._limpaFormulario()

                    })
            }).catch(erro => this._mensagem.texto = erro)
        
        
    }

    _limpaFormulario(){
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value =  0.0
        this._inputTipo.forEach(e => e.checked =false)

        this._inputData.focus()
    }

    apaga(){
        this._listaNegociacoes.esvazia()
        this._mensagem.texto = "Negociações apagadas com sucesso"
        
    }

    importaNegociacoes(){
        let service = new NegociacaoService()

        service.obterNegociacoes()
        .then(negociacoes => {
            negociacoes.forEach(e => this._listaNegociacoes.adiciona(e))
            this._mensagem.texto = "Negociações importadas com sucesso"})
        .catch(erro => this._mensagem.texto = erro)

       
    }


    ordena(campo){

        if(this._ordemAtual == campo) {
            this._listaNegociacoes.inverteOrdem()
        } else {
            this._listaNegociacoes.ordena((a, b) => a[campo] - b[campo]);
        }
        this._ordemAtual = campo;
    }

    criaNegociacao(){
        let negociacao = Factory.createNegociacao(this._inputTipo,
            {'date':DateHelper.textoParaData(this._inputData.value),
            'quantidade':parseInt( this._inputQuantidade.value),
            'valor':parseFloat(this._inputValor.value)});
        return negociacao
    }



}