'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegociacoesView = function (_View) {
    _inherits(NegociacoesView, _View);

    function NegociacoesView() {
        _classCallCheck(this, NegociacoesView);

        return _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).apply(this, arguments));
    }

    _createClass(NegociacoesView, [{
        key: 'template',
        value: function template(model) {
            return '<table class="table table-hover table-bordered">\n        <thead class="pointer">\n            <tr>\n                <th onclick="negociacaoController.ordena(\'data\')">DATA</th>\n                <th onclick="negociacaoController.ordena(\'quantidade\')">QUANTIDADE</th>\n                <th onclick="negociacaoController.ordena(\'valor\')">VALOR</th>\n                <th onclick="negociacaoController.ordena(\'tipo\')">TIPO</th>\n                <th onclick="negociacaoController.ordena(\'volume\')">VOLUME</th>\n            </tr>\n        </thead>\n        \n        <tbody>\n            ' + model.negociacoes.map(function (neg) {
                return '\n                    <tr>\n                        <td>' + DateHelper.dataParaTexto(neg.data) + '</td>\n                        <td>' + neg.quantidade + '</td>\n                        <td>' + neg.valor + '</td>\n                        <td>' + neg.tipo + '</td>\n                        <td>' + neg.volume + '</td>\n                    </tr>\n                ';
            }).join('') + '\n        </tbody>\n        \n        <tfoot>\n                <td colspan="4"></td>\n                <td>' + model.volumeTotal + '</td>\n\n        </tfoot>\n    </table>';
        }
    }]);

    return NegociacoesView;
}(View);
//# sourceMappingURL=NegociacoesView.js.map