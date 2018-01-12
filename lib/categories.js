"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AutoSizer = require("react-virtualized/dist/commonjs/AutoSizer");

var _AutoSizer2 = _interopRequireDefault(_AutoSizer);

var _List = require("react-virtualized/dist/commonjs/List");

var _List2 = _interopRequireDefault(_List);

var _findIndex = require("lodash/findIndex");

var _findIndex2 = _interopRequireDefault(_findIndex);

var _throttle = require("lodash/throttle");

var _throttle2 = _interopRequireDefault(_throttle);

var _categoryHeader = require("./category-header");

var _categoryHeader2 = _interopRequireDefault(_categoryHeader);

var _emojiRow = require("./emoji-row");

var _emojiRow2 = _interopRequireDefault(_emojiRow);

var _modifiers = require("./modifiers");

var _modifiers2 = _interopRequireDefault(_modifiers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// These height values must be kept in sync with the heights
// (margin + padding + content height) defined in CSS.
var CATEGORY_HEADER_ROW_HEIGHT = 46;
var EMOJI_ROW_HEIGHT = 32;

var Categories = function (_Component) {
  _inherits(Categories, _Component);

  function Categories(props, context) {
    _classCallCheck(this, Categories);

    var _this = _possibleConstructorReturn(this, (Categories.__proto__ || Object.getPrototypeOf(Categories)).call(this, props, context));

    _this.getActiveCategory = function () {
      return _this._getActiveCategory();
    };

    _this._setListRef = function (list) {
      _this.list = list;
    };

    _this._onScroll = (0, _throttle2.default)(function (_ref) {
      var scrollTop = _ref.scrollTop;

      var activeCategory = _this._getActiveCategory(scrollTop);
      if (activeCategory !== _this.lastActiveCategory) {
        _this.lastActiveCategory = activeCategory;
        _this.props.onActiveCategoryChange(activeCategory);
      }
    }, 100);

    _this._getActiveCategory = function () {
      var scrollTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rows = _this.props.rows;


      if (scrollTop === 0) {
        if (rows.length === 0) return undefined;
        return rows[0].id;
      }

      var firstFullyVisibleRowIndex = 0;
      var accumulatedScrollTop = 0;

      while (accumulatedScrollTop < scrollTop) {
        accumulatedScrollTop += _this._rowHeight({
          index: firstFullyVisibleRowIndex
        });

        if (accumulatedScrollTop <= scrollTop) {
          firstFullyVisibleRowIndex += 1;
        }
      }

      var currentRow = _this.props.rows[firstFullyVisibleRowIndex];

      if (Array.isArray(currentRow)) {
        return currentRow[0].category;
      }

      return currentRow.id;
    };

    _this._rowHeight = function (_ref2) {
      var index = _ref2.index;

      var row = _this.props.rows[index];
      return Array.isArray(row) ? EMOJI_ROW_HEIGHT : CATEGORY_HEADER_ROW_HEIGHT;
    };

    _this._rowRenderer = function (_ref3) {
      var key = _ref3.key,
          index = _ref3.index,
          style = _ref3.style;

      var row = _this.props.rows[index];
      var onChange = _this.props.onChange;


      if (Array.isArray(row)) {
        return _react2.default.createElement(_emojiRow2.default, { key: key, onChange: onChange, style: style, emojis: row });
      }

      var category = row.category,
          id = row.id;

      var attributes = {
        key: key,
        category: category,
        onChange: onChange,
        ref: _this._setCategoryRef(id),
        style: style
      };

      if (index === 0) {
        var _this$props = _this.props,
            modifier = _this$props.modifier,
            onModifierChange = _this$props.onModifierChange;


        attributes.headingDecoration = _react2.default.createElement(_modifiers2.default, { active: modifier, onChange: onModifierChange });
      }

      return _react2.default.createElement(_categoryHeader2.default, attributes);
    };

    _this._setCategoryRef = function (id) {
      return function (category) {
        _this.categories[id] = category;
      };
    };

    _this.jumpToCategory = function (id) {
      var index = (0, _findIndex2.default)(_this.props.rows, function (category) {
        return category.id === id;
      });
      _this.list.scrollToRow(index);
    };

    _this.lastActiveCategory = null;
    _this.categories = {};
    return _this;
  }

  _createClass(Categories, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.rows !== prevProps.rows || this.props.modifier !== prevProps.modifier) {
        this.list.recomputeRowHeights();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var rowCount = this.props.rows.length;

      return _react2.default.createElement(
        _AutoSizer2.default,
        { nonce: this.props.nonce },
        function (_ref4) {
          var height = _ref4.height,
              width = _ref4.width;
          return _react2.default.createElement(_List2.default, {
            height: height,
            onScroll: _this2._onScroll,
            ref: _this2._setListRef,
            rowCount: rowCount,
            rowHeight: _this2._rowHeight,
            rowRenderer: _this2._rowRenderer,
            scrollToAlignment: "start",
            tabIndex: null,
            width: width
          });
        }
      );
    }
  }]);

  return Categories;
}(_react.Component);

Categories.propTypes = {
  rows: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.shape({
    category: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired
  }), _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired])).isRequired,
  modifier: _propTypes2.default.string.isRequired,
  onActiveCategoryChange: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onModifierChange: _propTypes2.default.func.isRequired
};
exports.default = Categories;