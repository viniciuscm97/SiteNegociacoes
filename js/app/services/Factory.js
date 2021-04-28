"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
    function Factory() {
        _classCallCheck(this, Factory);
    }

    _createClass(Factory, null, [{
        key: "createProxy",
        value: function createProxy(objeto, props, acao) {
            return new Proxy(objeto, {
                get: function get(target, prop, receiver) {

                    if (props.includes(prop) && _typeof(target[prop]) == (typeof Function === "undefined" ? "undefined" : _typeof(Function))) {

                        return function () {
                            console.log("interceptando " + prop);
                            Reflect.apply(target[prop], target, arguments);
                            return acao(target);
                        };
                    }
                    return Reflect.get(target, prop, receiver);
                },
                set: function set(target, prop, value, receiver) {

                    if (props.includes(prop)) {
                        target[prop] = value;
                        acao(target);
                    }

                    return Reflect.set(target, prop, value, receiver);
                }
            });
        }
    }, {
        key: "createNegociacao",
        value: function createNegociacao(tipo, data) {

            var negociacao = null;

            if (tipo != null) {

                tipo.forEach(function (e) {

                    if (e.checked) {

                        if (e.value == "opcao") {
                            negociacao = new NegociacaoOpcao(data.date, data.quantidade, data.valor, "Opção");
                        } else if (e.value == "acao") {
                            negociacao = new NegociacaoAcao(data.date, data.quantidade, data.valor, "Ação");
                        } else {
                            negociacao = new Negociacao(data.date, data.quantidade, data.valor, "N/A");
                        }
                    }
                });
            } else {
                negociacao = new Negociacao(data.date, data.quantidade, data.valor, "N/A");
            }

            return negociacao;
        }
    }]);

    return Factory;
}();
//# sourceMappingURL=Factory.js.map