import { describe, expect, it } from 'vitest'
import type { Config } from 'payload'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Footer } from '@/Footer/config'
import { Header } from '@/Header/config'
import { SiteSettings } from '@/SiteSettings/config'
import { plugins } from '@/plugins'
import nextConfig from '../../next.config.js'

// The `users` collection has no roles and no public signup, so every account is a site admin:
// "logged in" is the admin check. These tests pin that anonymous visitors can never write.
const anon = { req: { user: null } } as any
const admin = { req: { user: { id: 1, collection: 'users' } } } as any

const call = async (fn: any, args: any) => {
  expect(typeof fn).toBe('function')
  return fn(args)
}

describe('content write access', () => {
  for (const [name, c] of Object.entries({ Pages, Posts, Media, Categories })) {
    for (const op of ['create', 'update', 'delete'] as const) {
      it(`${name}.${op}: anonymous denied, admin allowed`, async () => {
        expect(await call((c.access as any)?.[op], anon)).toBe(false)
        expect(await call((c.access as any)?.[op], admin)).toBe(true)
      })
    }
  }

  for (const [name, c] of Object.entries({ Pages, Posts })) {
    it(`${name}.read: anonymous sees published only`, async () => {
      expect(await call((c.access as any).read, anon)).toEqual({ _status: { equals: 'published' } })
    })
  }

  for (const [name, g] of Object.entries({ Header, Footer, SiteSettings })) {
    it(`${name}.update: anonymous denied, admin allowed`, async () => {
      expect(await call((g.access as any)?.update, anon)).toBe(false)
      expect(await call((g.access as any)?.update, admin)).toBe(true)
    })
  }
})

describe('plugin collection access', async () => {
  let config = {
    collections: [
      { slug: 'pages', fields: [] },
      { slug: 'posts', fields: [] },
      { slug: 'categories', fields: [] },
    ],
    globals: [],
  } as unknown as Config
  for (const plugin of plugins) config = await plugin(config)
  const access = (slug: string) => config.collections!.find((c) => c.slug === slug)!.access as any

  for (const slug of ['redirects', 'forms']) {
    it(`${slug}: public read, writes need a login`, async () => {
      expect(await call(access(slug).read, anon)).toBe(true)
      for (const op of ['create', 'update', 'delete']) {
        expect(await call(access(slug)[op], anon)).toBe(false)
        expect(await call(access(slug)[op], admin)).toBe(true)
      }
    })
  }

  it('form-submissions: public create, admin read/delete, no updates', async () => {
    const a = access('form-submissions')
    expect(await call(a.create, anon)).toBe(true)
    expect(await call(a.read, anon)).toBe(false)
    expect(await call(a.read, admin)).toBe(true)
    expect(await call(a.delete, anon)).toBe(false)
    expect(await call(a.update, admin)).toBe(false)
  })
})

describe('media CSP', () => {
  it('serves /media/* with a sandboxing CSP', async () => {
    const rules = await (nextConfig as any).headers()
    const media = rules.find((r: any) => r.source === '/media/:path*')
    const csp = media?.headers.find((h: any) => h.key === 'Content-Security-Policy')?.value
    expect(csp).toBe("default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; sandbox")
  })
})
