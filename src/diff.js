import _ from 'lodash';

const buildDiff = (before, after) => {
  const buildNode = (key) => {
    const beforeValue = before[key];
    const afterValue = after[key];

    if (beforeValue === afterValue) {
      return { key, value: beforeValue, type: 'unchanged' };
    }

    if (_.isObject(beforeValue) && _.isObject(afterValue)) {
      return { key, children: buildDiff(beforeValue, afterValue), type: 'nested' };
    }

    if (_.has(before, key) && _.has(after, key)) {
      return {
        key, beforeValue, afterValue, type: 'changed',
      };
    }

    if (_.has(after, key)) {
      return { key, value: afterValue, type: 'added' };
    }

    return { key, value: beforeValue, type: 'removed' };
  };

  const unionKeys = _.union(_.keys(before), _.keys(after));

  return unionKeys.map(buildNode);
};

export default buildDiff;
