// sequence is the rpc unique id
let sequence = 0

// rpc makes a remote procedure call and returns a promise
export default async function rpc(method, params) {
  const res = await fetch(window.electron.rpc, {
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
  })

  return await res.json()
}
