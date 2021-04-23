class NegociacoesView extends View {

 
    template(model) {
        return `<table class="table table-hover table-bordered">
        <thead class="pointer">
            <tr>
                <th onclick="negociacaoController.ordena('data')">DATA</th>
                <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                <th onclick="negociacaoController.ordena('tipo')">TIPO</th>
                <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
            ${model.negociacoes.map(neg =>
                `
                    <tr>
                        <td>${DateHelper.dataParaTexto(neg.data)}</td>
                        <td>${neg.quantidade}</td>
                        <td>${neg.valor}</td>
                        <td>${neg.tipo}</td>
                        <td>${neg.volume}</td>
                    </tr>
                `
            ).join('')}
        </tbody>
        
        <tfoot>
                <td colspan="4"></td>
                <td>${model.volumeTotal}</td>

        </tfoot>
    </table>`;
    }
  
}