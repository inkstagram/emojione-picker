"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require("react-addons-shallow-compare");

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategoryHeader = function (_Component) {
  _inherits(CategoryHeader, _Component);

  function CategoryHeader() {
    _classCallCheck(this, CategoryHeader);

    return _possibleConstructorReturn(this, (CategoryHeader.__proto__ || Object.getPrototypeOf(CategoryHeader)).apply(this, arguments));
  }

  _createClass(CategoryHeader, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          category = _props.category,
          headingDecoration = _props.headingDecoration,
          style = _props.style;


      return _react2.default.createElement(
        "div",
        { className: "emoji-category-header", style: style },
        _react2.default.createElement(
          "h2",
          { className: "emoji-category-title" },
          category.title
        ),
        _react2.default.createElement(
          "div",
          { className: "emoji-category-heading-decoration" },
          headingDecoration
        )
      );
    }
  }]);

  return CategoryHeader;
}(_react.Component);

CategoryHeader.propTypes = {
  category: _propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired
  }).isRequired,
  headingDecoration: _propTypes2.default.node,
  onChange: _propTypes2.default.func.isRequired,
  style: _propTypes2.default.object
};
exports.default = CategoryHeader;