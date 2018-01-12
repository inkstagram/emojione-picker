"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pick = require("lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _emojione = require("emojione");

var _emojione2 = _interopRequireDefault(_emojione);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Emoji = function (_Component) {
  _inherits(Emoji, _Component);

  function Emoji() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Emoji);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Emoji.__proto__ || Object.getPrototypeOf(Emoji)).call.apply(_ref, [this].concat(args))), _this), _this._handleKeyUp = function (ev) {
      ev.preventDefault();
      if (ev.key === "Enter" || ev.key === " ") {
        _this._handleClick(ev);
      }
    }, _this._handleClick = function (ev) {
      _this.props.onSelect(ev, (0, _pick2.default)(_this.props, "shortname", "aliases", "aliases_ascii", "category", "name", "shortcode", "unicode", "unicode_alternates", "keywords"));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Emoji, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // avoid rerendering the Emoji component if the shortname hasn't changed
      return nextProps.shortname !== this.props.shortname;
    }
  }, {
    key: "createMarkup",
    value: function createMarkup() {
      return { __html: _emojione2.default.shortnameToImage(this.props.shortname) };
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", {
        onKeyUp: this._handleKeyUp,
        onClick: this._handleClick,
        tabIndex: "0",
        className: "emoji",
        "aria-label": this.props.ariaLabel,
        title: this.props.name,
        role: this.props.role,
        dangerouslySetInnerHTML: this.createMarkup()
      });
    }
  }]);

  return Emoji;
}(_react.Component);

Emoji.propTypes = {
  ariaLabel: _propTypes2.default.string,
  name: _propTypes2.default.string,
  onSelect: _propTypes2.default.func.isRequired,
  shortname: _propTypes2.default.string,
  title: _propTypes2.default.string,
  role: _propTypes2.default.string
};
exports.default = Emoji;