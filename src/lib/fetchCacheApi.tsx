async function fetchCacheApi(path: string) {
  if (!path) return null

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/" + path, {
    method: "GET",
    credentials: 'include',
    headers: { "authorization": '' },
    next: { revalidate: 600 }
  })
  if (!res.ok) {
    console.log("error:", res, process.env.NEXT_PUBLIC_API_URL + "/api/" + path)
    return null
  }
  console.log(process.env.NEXT_PUBLIC_API_URL + "/api/" + path)

  return res.json()
}
export default fetchCacheApi
