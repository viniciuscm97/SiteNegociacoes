class Factory {
    static createProxy(objeto,props, acao){
        return new Proxy(objeto, {
            get(target, prop, receiver) {

                if (props.includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    return function () {
                        console.log(`interceptando ${prop}`)
                        Reflect.apply(target[prop],target,arguments)
                        return acao(target)
                    }
                }
                return Reflect.get(target,prop,receiver)
            },
            
            set(target,prop,value,receiver){       

                if(props.includes(prop)){
                    target[prop] = value
                    acao(target)
                    
                }

                return Reflect.set(target,prop,value,receiver)
            }
        })
    }

    static createNegociacao(tipo, data){
        
        let negociacao = null;
        
        console.log(tipo)

        tipo.forEach(e => {
            if(e.checked){
                console.log (e.value + ' ' + e.checked)
                if(e.value == "opcao") {
                    negociacao = new NegociacaoOpcao(data.date, data.quantidade, data.valor,"Opção");
                } else if(e.value == "acao") {
                    negociacao = new NegociacaoAcao(data.date, data.quantidade, data.valor,"Ação");
                }else{
                    negociacao = new NegociacaoAcao(data.date, data.quantidade, data.valor,"N/A");
                } 

            }

            // if(e.value == "opcao" && e.checked) {
            //     negociacao = new NegociacaoOpcao(data.date, data.quantidade, data.valor,"Opção");
            // } else if( e.value == "acao" && e.checked) {
            //     negociacao = new NegociacaoAcao(data.date, data.quantidade, data.valor,"Ação");
            // }else{
            //     negociacao = new Negociacao(data.date, data.quantidade, data.valor,"N/A");
                
            // }
            
        });

        
        // if(tipo == "opcao") {
        //     negociacao = new NegociacaoOpcao(data.date, data.quantidade, data.valor,"Opção");
        // } else if( tipo == "acao") {
        //     negociacao = new NegociacaoAcao(data.date, data.quantidade, data.valor,"Ação");
        // }else{
        //     negociacao = new NegociacaoAcao(data.date, data.quantidade, data.valor,"N/A");
            
        // }

        return negociacao
        
    }
    
}