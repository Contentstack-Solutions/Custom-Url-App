const filterFetchedArray = (array: any[]) => {
  const tempFetchedList = [...array];
  const fetchedList = Array.from(
    new Set(tempFetchedList?.map((a) => a?.id))
  )?.map((id) => tempFetchedList?.find((a) => a?.id === id));
  return fetchedList;
};

const mergeObjects = (target: any, source: any) => {
  // Iterate through `source` properties and if an `Object` then
  // set property to merge of `target` and `source` properties
  Object.keys(source)?.forEach((key) => {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source?.[key], mergeObjects(target?.[key], source?.[key]));
    }
  });

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
};
export default {
  filterFetchedArray,
  mergeObjects,
};
