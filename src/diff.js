import _ from 'lodash';

const buildDiff = (before, after) => {
  const buildNode = (key) => {
    const beforeValue = before[key];
    const afterValue = after[key];

    if (_.has(after, key) && !_.has(before, key)) {
      return { key, value: afterValue, type: 'added' };
    }

    if (_.has(before, key) && !_.has(after, key)) {
      return { key, value: beforeValue, type: 'removed' };
    }

    if (_.has(before, key) && _.has(after, key) && beforeValue === afterValue) {
      return { key, value: beforeValue, type: 'unchanged' };
    }

    if (_.isObject(beforeValue) && _.isObject(afterValue)) {
      return { key, children: buildDiff(beforeValue, afterValue), type: 'nested' };
    }

    return {
      key, beforeValue, afterValue, type: 'changed',
    };
  };

  const unionKeys = _.union(_.keys(before), _.keys(after));

  return unionKeys.map(buildNode);
};

export default buildDiff;
