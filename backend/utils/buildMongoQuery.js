function buildMongoQuery(rules) {
  if (!rules.length) return {};
  let andArr = [];
  let orArr = [];
  rules.forEach(rule => {
    let cond = {};
    if (rule.operator === ">") cond[rule.field] = { $gt: rule.value };
    if (rule.operator === "<") cond[rule.field] = { $lt: rule.value };
    if (rule.operator === "==") cond[rule.field] = rule.value;
    if (rule.logic === "AND") andArr.push(cond);
    if (rule.logic === "OR") orArr.push(cond);
  });
  if (andArr.length && orArr.length)
    return { $and: andArr, $or: orArr };
  else if (andArr.length) return { $and: andArr };
  else if (orArr.length) return { $or: orArr };
  return {};
}
module.exports = buildMongoQuery;
