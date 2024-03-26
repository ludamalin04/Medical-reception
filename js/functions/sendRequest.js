export async function sendRequest(url, method, options) {
    const response = await fetch(url, {
        method: method,
        ...options,
    })
return response
}