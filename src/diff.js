import _ from 'lodash';

const diff = (before, after) => {
  const buildMethods = [
    {
      condition: (key) => before[key] === after[key],
      getNode: (key) => ({ key, value: before[key], type: 'unchanged' }),
    },
    {
      condition: (key) => _.isObject(before[key]) && _.isObject(after[key]),
      getNode: (key) => ({ key, children: diff(before[key], after[key]), type: 'nested' }),
    },
    {
      condition: (key) => _.has(before, key) && _.has(after, key),
      getNode: (key) => [
        { key, value: before[key], type: 'removed' },
        { key, value: after[key], type: 'added' },
      ],
    },
    {
      condition: (key) => _.has(after, key),
      getNode: (key) => ({ key, value: after[key], type: 'added' }),
    },
    {
      condition: (key) => _.has(before, key),
      getNode: (key) => ({ key, value: before[key], type: 'removed' }),
    },
  ];

  const unionKeys = _.union(_.keys(before), _.keys(after));

  return unionKeys.reduce((acc, key) => {
    const { getNode } = buildMethods.find(({ condition }) => condition(key));
    return _.flatten([...acc, getNode(key)]);
  }, []);
};

export default diff;
