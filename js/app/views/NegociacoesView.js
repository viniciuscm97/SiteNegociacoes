class NegociacoesView extends View {

 
    template(model) {
        return `<table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>TIPO</th>
                <th>VOLUME</th>
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