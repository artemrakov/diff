import _ from 'lodash';

const build = (key, beforeData, afterData) => {
  const beforeValue = beforeData[key];
  const afterValue = afterData[key];

  if (_.has(beforeData, key) && _.has(afterData, key)) {
    if (beforeValue === afterValue) {
      return { key, value: beforeValue, type: 'unchanged' };
    }

    return {
      key,
      type: 'changed',
      values: [
        { key, value: afterValue, type: 'added' },
        { key, value: beforeValue, type: 'removed' },
      ],
    };
  }


  if (_.has(beforeData, key)) {
    return { key, value: beforeValue, type: 'removed' };
  }


  return { key, value: afterValue, type: 'added' };
};


export default (beforeData, afterData) => {
  const unionKeys = _.union(_.keys(beforeData), _.keys(afterData));
  return unionKeys.reduce((acc, key) => [...acc, build(key, beforeData, afterData)], []);
};
