export default function createEmojisFromStrategy(strategy) {
  const emojis = {};
  // categorise and nest emoji
  // sort ensures that modifiers appear unmodified keys
  const keys = Object.keys(strategy);
  for (const key of keys) {
    const value = strategy[key];

    // skip unknown categories
    if (value.category !== "modifier") {
      if (!emojis[value.category]) emojis[value.category] = {};

      if (value.diversity) {
        const baseKey  = value.code_points.base.replace('-' + value.diversity, '');
        const match    = value.shortname.match(/(.*?)_tone(.*?)$/);
        const modifier = match[2].replace(':','');
        
        // this check is to stop the plugin from failing in the case that the
        // emoji strategy miscategorizes tones - which was the case here:
        // https://github.com/Ranks/emojione/pull/330
        const unmodifiedEmojiExists = !!emojis[value.category][baseKey];
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

  return emojis;
}
