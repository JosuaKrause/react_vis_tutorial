
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
}
