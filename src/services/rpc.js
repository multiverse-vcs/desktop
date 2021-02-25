// sequence is the rpc unique id
let sequence = 0

// rpc makes a remote procedure call and returns a promise
export default function rpc(method, params) {
  return fetch(window.multiverse.rpcURL, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sequence++, 
      method: method, 
      params: params
    }),
  }).then(res => res.json())
}
