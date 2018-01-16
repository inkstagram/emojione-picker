"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRowsSelector;

var _escapeStringRegexp = require("escape-string-regexp");

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _chunk = require("lodash/chunk");

var _chunk2 = _interopRequireDefault(_chunk);

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

var _values = require("lodash/values");

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function rowsSelector(categories, emojisByCategory, modifier, search, term) {
  // console.log(`createRowsSelector modifier: ${modifier}`);

  var findEmojiVariant = function findEmojiVariant(emojis) {
    return modifier && emojis[modifier] ? emojis[modifier] : emojis[0];
  };

  var searchTermRegExp = new RegExp("^(?:.* +)*" + (0, _escapeStringRegexp2.default)(term), "i");
  var keywordMatchesSearchTerm = function keywordMatchesSearchTerm(keyword) {
    return searchTermRegExp.test(keyword);
  };
  var emojiMatchesSearchTerm = function emojiMatchesSearchTerm(emoji) {
    return emoji.keywords.concat(emoji.name).some(keywordMatchesSearchTerm);
  };

  return (0, _map2.default)(categories, function (category, id) {
    var list = emojisByCategory[id] || {};
    var emojis = (0, _values2.default)(list).map(findEmojiVariant);

    if (search && term) {
      emojis = emojis.filter(emojiMatchesSearchTerm);
    }

    return {
      category: category,
      emojis: emojis,
      id: id
    };
  }).filter(function (_ref) {
    var emojis = _ref.emojis;
    return emojis.length > 0;
  }).map(function (_ref2) {
    var category = _ref2.category,
        emojis = _ref2.emojis,
        id = _ref2.id;
    return [{
      category: category,
      id: id
    }].concat(_toConsumableArray((0, _chunk2.default)(emojis, 9)));
  }).reduce(function (rows, categoryAndEmojiRows) {
    return [].concat(_toConsumableArray(rows), _toConsumableArray(categoryAndEmojiRows));
  }, []);
}

function createRowsSelector() {
  var lastCategories = void 0;
  var lastEmojisByCategory = void 0;
  var lastModifier = void 0;
  var lastSearch = void 0;
  var lastTerm = void 0;
  var lastResult = void 0;

  return function memoizedRowsSelector(categories, emojisByCategory, modifier, search, term) {
    if (categories !== lastCategories || emojisByCategory !== lastEmojisByCategory || modifier !== lastModifier || search !== lastSearch || term !== lastTerm) {
      lastResult = rowsSelector(categories, emojisByCategory, modifier, search, term);
      lastCategories = categories;
      lastEmojisByCategory = emojisByCategory;
      lastModifier = modifier;
      lastSearch = search;
      lastTerm = term;
    }

    return lastResult;
  };
}