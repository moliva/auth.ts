export function removeCookie(cname: string): void {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

export function getCookie(cname: string): string | null {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}

export function setCookie(name: string, value: string, expirationDays?: number): void {
  let expirationString = ''

  if (expirationDays) {
    const date = new Date()
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000) // millis to days
    expirationString = `;expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${value};SameSite=Strict;Secure;path=/${expirationString}`
}
