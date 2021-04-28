'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {

            return this._http.get('negociacoes/semana').then(function (negociacoes) {
                return negociacoes.map(function (e) {
                    return Factory.createNegociacao(null, {
                        'date': new Date(e.data),
                        'quantidade': e.quantidade,
                        'valor': e.valor });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possivel importar negociações da semana");
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {

            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                return negociacoes.map(function (e) {
                    return Factory.createNegociacao(null, {
                        'date': new Date(e.data),
                        'quantidade': e.quantidade,
                        'valor': e.valor });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possivel obter as negociações da semana anterior");
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {

            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                return negociacoes.map(function (e) {
                    return Factory.createNegociacao(null, {
                        'date': new Date(e.data),
                        'quantidade': e.quantidade,
                        'valor': e.valor });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possivel obter as negociações da semana retrasada");
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
                var todasNegociacoes = negociacoes.reduce(function (arrayAchatado, arrayAtual) {
                    return arrayAchatado.concat(arrayAtual);
                }, []);
                return todasNegociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociacao adicionada com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possivel adicionar a negociação');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível importar as negociações");
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível apagar as negociações");
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {

            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (item) {
                        return negociacao.isEquals(item);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível apagar as negociações");
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map