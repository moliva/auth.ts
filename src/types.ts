export type IdToken = {
  sub: number // user id
  // fields
  name: string
  picture: string
  email: string
}

export type Identity = {
  identity: IdToken
}

export type MinAppState = {
  identity: Identity | undefined
  error?: any
}
