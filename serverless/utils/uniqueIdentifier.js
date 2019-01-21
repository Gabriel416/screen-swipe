module.exports.uniqueIdentifier = length => {
  let result = "";
  let chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};
