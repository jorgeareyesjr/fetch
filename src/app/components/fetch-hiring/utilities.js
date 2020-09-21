/**
 * 
 * @param {array} data - A dataset to filter.
 * @param {string} key - The key used to filter the dataset.
 * @returns {array} - Return a dataset, filtered by `key`.
**/
function filterDataByKey(data, key) {
  return data.filter((obj) => {
    return obj[`${key}`]
  });
};

/**
 * 
 * @param {array} data - A dataset with multiple objects that need to be organized into groups.
 * @param {string} key - The key used to identify and sort groups within the dataset.
 * @returns {array} - Returns a map of the dataset groups, based on `key`.
**/
async function mapDataGroupsByKey(data, key) {
  const dataGroupsMap = new Map();

  data.forEach((item) => {
    const dataGroup = dataGroupsMap.get(item[`${key}`]);

    (dataGroup) ? dataGroup.push(item) : dataGroupsMap.set(item[`${key}`], [item]);
  });

  return dataGroupsMap;
};
 
/**
 * 
 * @param {array} data - A dataset to be ordered.
 * @returns {array} - Return a dataset ordered by `name`.
**/
function orderDataByName(data) {
  const cloneArr = [];

  for(let i = 0; i < data.length; i++) {
    let splitName = data[i].name.split(" ")
    let nameId = parseInt(splitName[1]);

    cloneArr.push({ order: nameId , ...data[i] });
  };

  const orderedData = sortDataByKey(cloneArr, 'order');

  for(let i = 0; i < orderedData.length; i++) {
    delete orderedData[i]['order'];
    
    orderedData[i]['processed'] = true;
  };

  return orderedData;
};

/**
 * 
 * @param {array} data - A dataset to sort.
 * @param {string} key - The key used to sort the dataset.
 * @param {string} order - (optional) The order to sort the dataset, `asc` or `desc` - will default to `asc`.
 * @returns {array} - Return a dataset, sorted by `key`.
**/
function sortDataByKey(data, key, order) {
  let sortedData;

  function sortAscending(data) {
    return data.sort((a,b) => {
      return a[`${key}`] - b[`${key}`];
    });
  };
  function sortDescending(data) {
    return data.sort((a,b) => {
      return b[`${key}`] - a[`${key}`];
    });
  };

  switch(order) {
    case 'desc':
      sortedData = sortDescending(data);
      break; 
    default:
      sortedData = sortAscending(data);
    break;
  };

  return sortedData;
};

export {
  filterDataByKey,
  mapDataGroupsByKey,
  orderDataByName,
  sortDataByKey
}