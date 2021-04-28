class DateHelper {

    constructor(){
        throw new Error('DateHelper não pode ser instanciada')
    }
    // static para nao precisar criar uma estancia da classe
    static dataParaTexto(data){
        //template string
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    }

    static textoParaData(texto){
        // expressao regular
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error('Deve estar no formado aaaa-mm-dd')
        return new Date(... texto.split('-').map((item, ind) =>  item - ind % 2))
    }

    
}