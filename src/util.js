
let ACTION_COUNT = 0;
const ACTION_MAP = {};
export function getReducer() {
  return (state, action) => {
    const act = ACTION_MAP[action.type];
    if(act) return act(state, action);
    return state;
  };
} // getReducer

export function registerSetAction(varName, dispatch) {
  const actionName = `SET_ACTION_${ACTION_COUNT}`;
  ACTION_COUNT += 1;
  ACTION_MAP[actionName] = (state, action) => {
    return {
      ...state,
      [varName]: action.value,
    };
  };
  return (v) => dispatch({
    type: actionName,
    value: v,
  });
} // registerSetAction

export function getDefault(value, defaultValue) {
  return value === null || value === undefined ? defaultValue : value;
} // getDefault

export function fromStorage(key) {
  const item = sessionStorage.getItem(key);
  if(item === null || item === undefined) return null;
  return JSON.parse(item);
} // fromStorage

export function toStorage(key, value) {
  if(value === null || value === undefined) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.setItem(key, JSON.stringify(value, null, ''));
  }
} // toStorage

export function doFetch(url, cb) {
  fetch(`${window.PUBLIC_URL}${url}`).then((data) => {
    if(data.status !== 200 || !data.ok) {
      throw new Error(`server returned ${data.status}${data.ok ? " ok" : ""}`);
    }
    const ct = data.headers.get("content-type");
    if(ct && ct.includes("application/json")) {
      return data.json();
    }
    throw new TypeError("response not JSON encoded");
  }).then(cb);
} // doFetch

export function columnSum(vals) {
  return vals.reduce((p, v) => p + +v, 0);
} // columnSum

export function maxs(values) {
  return values.reduce((p, vals) => {
    if(p === null) return vals;
    return vals.map((v, ix) => Math.max(p[ix], +v));
  }, null) || [];
} // maxs
