"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = function () {
    function Negociacao(data, quantidade, valor, tipo) {
        _classCallCheck(this, Negociacao);

        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        this._tipo = tipo;

        Object.freeze(this);
    }

    _createClass(Negociacao, [{
        key: "isEquals",
        value: function isEquals(outraNegociacao) {
            return JSON.stringify(this) == JSON.stringify(outraNegociacao);
        }
    }, {
        key: "volume",
        get: function get() {
            return this._quantidade * this._valor;
        }
    }, {
        key: "data",
        get: function get() {
            return new Date(this._data.getTime());
            // para evitar n1.data.setData()
        }
    }, {
        key: "quantidade",
        get: function get() {
            return this._quantidade;
        }
    }, {
        key: "valor",
        get: function get() {
            return this._valor;
        }
    }, {
        key: "tipo",
        get: function get() {
            return this._tipo;
        }
    }]);

    return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map