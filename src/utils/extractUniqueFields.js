import { FIELDS } from '../constants/product-fields.js';
import { uniq } from 'lodash';

//create array of fields with values
const populateComparableFields = (prev, curr) => {
  let comparableFields = [];
  //uses constant array of fields that can be compared to generate list of key/value pairs
  //key: field name, value: array of field values
  FIELDS.forEach(field => {
    prev.forEach(p => {
      if (!comparableFields || comparableFields.length === 0) {
        comparableFields = [
          { [field]: [curr[field]] }
        ];
      } else {
        comparableFields[0][field] = [
          ...(Array.isArray(prev[0][field]) ? prev[0][field] : [prev[0][field]]), curr[field]];
      }
    })
  })
  return comparableFields;
}

const createListOfComparableFields = (highlighted) => {
  //only compares when there's more than 1 selection
  return highlighted.length > 1 ?
  //appends value of field to create an array of valies for each field
  highlighted.reduce((prev, curr) => {
    let comparedFields = populateComparableFields(prev, curr)

    if (prev.length === 0){
      prev.push(curr);
      return prev;
    }
    return comparedFields;
}, []) : [];
}

export const getUniqueFields = (highlighted) => {
  let uniqueComparedFields = [];
  let uniquedComparedKeys;
  //generates a list of fields for comparison and an array of values
  // eg. [{Kleur: ["Zwarte", "Zwarte"]}]
  const listOfComparableFields = createListOfComparableFields(highlighted);

  listOfComparableFields.forEach((f) => {
    FIELDS.forEach(field => {
      if (uniq(f[field]).length > 1) {
        uniqueComparedFields.push({[field]: f[field]})
      }
    })
  })
  
  uniquedComparedKeys = uniqueComparedFields.map(u => Object.keys(u)[0]);

  return uniquedComparedKeys;
}