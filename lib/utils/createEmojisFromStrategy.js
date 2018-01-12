'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEmojisFromStrategy;
function createEmojisFromStrategy(strategy) {
  var emojis = {};
  // categorise and nest emoji
  // sort ensures that modifiers appear unmodified keys
  var keys = Object.keys(strategy);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = strategy[key];

      // skip unknown categories
      if (value.category !== "modifier") {
        if (!emojis[value.category]) emojis[value.category] = {};

        if (value.diversity) {
          var baseKey = value.code_points.base.replace('-' + value.diversity, '');
          var match = value.shortname.match(/(.*?)_tone(.*?)$/);
          var modifier = match[2].replace(':', '');

          // this check is to stop the plugin from failing in the case that the
          // emoji strategy miscategorizes tones - which was the case here:
          // https://github.com/Ranks/emojione/pull/330
          var unmodifiedEmojiExists = !!emojis[value.category][baseKey];
          // console.log(unmodifiedEmojiExists);
          if (unmodifiedEmojiExists) {
            emojis[value.category][baseKey][modifier] = value;
          }
        } else {
          // ensure the shortname is included as a keyword
          if (!value.keywords.includes(key)) {
            value.keywords.push(key);
          }

          emojis[value.category][key] = [value];
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return emojis;
}