export let AUTH_HOST: string | undefined = undefined

export function setApiHost(host: string): void {
  AUTH_HOST = host
}

export async function logout(): Promise<void> {
  await authentifiedFetch(`${AUTH_HOST}/logout`)
}

let refreshing = false

export async function authentifiedFetch(url: string, init: RequestInit | undefined = {}) {
  if (!AUTH_HOST) {
    throw new Error('API_HOST not set')
  }

  const options = {
    ...init,
    mode: 'cors' as const, // no-cors, *cors, same-origin
    cache: 'no-cache' as const, // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include' as const // Ensures cookies are sent with the request
  }

  const response = await fetch(url, options)

  if (response.status === 401) {
    if (!refreshing) {
      refreshing = true

      let refreshResponse
      try {
        refreshResponse = await refresh(options)
      } catch {}
      refreshing = false

      if (!refreshResponse?.ok) {
        await logout()

        return response
      }
    } else {
      // wait for the token to be refreshed
      while (refreshing) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    // retry the original request
    return await fetch(url, options)
  } else {
    return response
  }
}

async function refresh(init: RequestInit) {
  return await fetch(`${AUTH_HOST}/refresh`, { ...init, method: 'POST' })
}
