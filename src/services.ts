export let AUTH_HOST: string | undefined = undefined
let WEB_PATH: string | undefined = undefined

export type AuthConfig = {
  api: string
  web: string
}

export function setAuthConfig({ api, web }: AuthConfig): void {
  AUTH_HOST = api
  WEB_PATH = web
}

export async function logout(): Promise<Response> {
  // TODO - redirect manual needed to avoid throwing error when it cannot redirect - moliva - 2025/01/04
  return await authentifiedFetch(`${AUTH_HOST}/logout`, {
    redirect: 'manual'
  })
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
      // enter refreshing critical section
      refreshing = true

      let refreshResponse
      try {
        refreshResponse = await refresh(options)
      } catch {}

      if (!refreshResponse?.ok) {
        await logout()

        // redirect to home page
        location.assign(WEB_PATH!)

        return response
      }

      // leave refreshing critical section
      refreshing = false
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
