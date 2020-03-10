import _ from 'lodash';

const build = (key, beforeData, afterData) => {
  const beforeValue = beforeData[key];
  const afterValue = afterData[key];

  if (_.isObject(beforeValue) && _.isObject(afterValue)) {
    return { key, children: diff(beforeValue, afterValue), type: 'unchanged' }
  }

  if (_.has(beforeData, key) && _.has(afterData, key)) {
    if (beforeValue === afterValue) {
      return { key, value: beforeValue, type: 'unchanged' };
    }

    return {
      key,
      type: 'changed',
      values: [
        { key, value: beforeValue, type: 'removed' },
        { key, value: afterValue, type: 'added' }
      ],
    };
  }


  if (_.has(afterData, key)) {
    return { key, value: afterValue, type: 'added' };
  }


  return { key, value: beforeValue, type: 'removed' };
};


const diff = (beforeData, afterData) => {
  const unionKeys = _.union(_.keys(beforeData), _.keys(afterData));
  return unionKeys.reduce((acc, key) => [...acc, build(key, beforeData, afterData)], []);
};

export default diff;
