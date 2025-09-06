// 'use server'

// import { Locale, Locales, defaultLocale, locales } from '@/i18n'
// import { match } from '@formatjs/intl-localematcher'
// import Negotiator from 'negotiator'
// import { cookies, headers } from 'next/headers'

// const COOKIE_NAME = 'NEXT_LOCALE'

// function getAcceptLanguageLocale(requestHeaders: Headers, locales: Locales) {
//   let locale
//   const languages = new Negotiator({
//     headers: {
//       'accept-language': requestHeaders.get('accept-language') || undefined,
//     },
//   }).languages()
//   try {
//     locale = match(languages, locales, defaultLocale)
//   } catch (e) {
//     // invalid language - fallback to default
//     locale = defaultLocale
//   }
//   return locale
// }

// export async function getUserLocale() {
//   let locale

//   // Prio 1: use existing cookie
//   locale = cookies().get(COOKIE_NAME)?.value

//   // Prio 2: use `accept-language` header
//   // Prio 3: use default locale
//   if (!locale) {
//     locale = getAcceptLanguageLocale(headers(), locales)
//   }

//   return locale
// }

// export async function setUserLocale(locale: Locale) {
//   cookies().set(COOKIE_NAME, locale)
// }
'use server'

import { Locale, Locales, defaultLocale, locales } from '@/i18n'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { cookies, headers } from 'next/headers'

const COOKIE_NAME = 'NEXT_LOCALE'

function getAcceptLanguageLocale(requestHeaders: Headers, locales: Locales) {
  let locale
  const languages = new Negotiator({
    headers: {
      'accept-language': requestHeaders.get('accept-language') || undefined,
    },
  }).languages()

  try {
    locale = match(languages, locales, defaultLocale)
  } catch (e) {
    // fallback if no match
    locale = defaultLocale
  }

  return locale
}

export async function getUserLocale(): Promise<Locale> {
  let locale: string | undefined

  // Prio 1: use existing cookie
  locale = cookies().get(COOKIE_NAME)?.value

  // Prio 2: use accept-language header
  if (!locale) {
    locale = getAcceptLanguageLocale(headers(), locales)
  }

  // Ensure locale is one of the supported ones
  if (!locales.includes(locale as Locale)) {
    locale = defaultLocale
  }

  return locale as Locale
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale)
}
