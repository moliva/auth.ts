import { Accessor, Setter } from 'solid-js'

import { getCookie } from './cookies'
import { MinAppState, IdToken } from './types'

export const ID_TOKEN_COOKIE = 'id_token'

export function handleAuth<T extends MinAppState>(state: Accessor<T>, setState: Setter<T>): void {
  if (!state().identity) {
    let identity: IdToken | undefined = undefined

    // check in cookies
    let token = getCookie(ID_TOKEN_COOKIE)

    if (token !== null) {
      const idToken = token.split('.')[1]

      const decoded = atob(idToken)
      identity = JSON.parse(decoded) as IdToken
    }

    if (identity) {
      const newIdentityState = { identity }
      // TODO - why is it erring here without the any - moliva - 2024/12/26
      setState({ ...state(), identity: newIdentityState } as any)
    }
  }
}
