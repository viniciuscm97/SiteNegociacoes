class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputQuantidade = $('#quantidade')
        this._inputData = $('#data')
        this._inputValor = $('#valor')
        this._inputTipo = document.querySelectorAll('#tipo')

        this._ordemAtual = '';
    
        this._service = new NegociacaoService()
    
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia', 'ordena', 'inverteOrdem')

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        )
        
        this._init()
    }
    
    _init() {

        this._service
            .lista()
            .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro =>  this._mensagem.texto = erro)


            setInterval(() => {
                this.importaNegociacoes()
            }, 3000)
        
    }

    adiciona(event){        

        event.preventDefault()
        
        let negociacao = this.criaNegociacao()

        this._service
        .cadastra(negociacao)
        .then( mensagem => {
            this._listaNegociacoes.adiciona(negociacao)
            this._mensagem.texto = mensagem
            this._limpaFormulario()
        })
        .catch( erro => this._mensagem.texto = erro)
        
        
    }

    _limpaFormulario(){
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value =  0.0
        this._inputTipo.forEach(e => e.checked =false)

        this._inputData.focus()
    }

    apaga(){

        this._service
            .apaga()
            .then(mensagem => {
                this._listaNegociacoes.esvazia()
                this._mensagem.texto = mensagem})
            .catch(erro => this._mensagem.texto = erro )

    }

    importaNegociacoes(){
        this._service
            .importa(this._listaNegociacoes.negociacoes)
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