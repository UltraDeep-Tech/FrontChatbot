import { cookies } from 'next/headers'
async function fetchApi(path: string) {
  const cookieStore = cookies()
  const authorization = cookieStore.get('authorization')
  if (!path) return null

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/" + path, {
    method: "GET",
    credentials: 'include',
    headers: { "authorization": String(authorization?.value) },
    cache: 'no-store'
  })
  if (!res.ok) {
    console.log("error:", authorization, process.env.NEXT_PUBLIC_API_URL + "/api/" + path,)
    return null
  }
  console.log(process.env.NEXT_PUBLIC_API_URL + "/api/" + path)

  return res.json()
}
export default fetchApi
