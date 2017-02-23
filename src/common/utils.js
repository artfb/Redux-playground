import { fromJS } from 'immutable';

export function fetchComponentData(dispatch, components, params) {
  const needs = components
    .reduce((prev, current) => (current ? (current.needs || []).concat(prev) : prev), []);

  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}

// Abstraction to handle pre-composedstate received from server
// (ie, leave top level keys untouched)
export function immutifyState(obj) {
  const objMut = Object.assign({}, obj);

  Object
    .keys(objMut)
    .forEach((key) => {
      objMut[key] = fromJS(objMut[key]);
    });

  return objMut;
}
