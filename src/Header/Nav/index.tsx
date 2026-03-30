'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map(({ link }, i) => {
          const href = link?.url || '/'
          const label = link?.label || ''
          const isExternal = href.startsWith('http')
          const isLast = i === navItems.length - 1

          if (isLast && isExternal) {
            // CTA button (last item, external link like fitssey.com)
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
              >
                {label}
              </a>
            )
          }

          return (
            <Link
              key={i}
              href={href}
              className="text-base font-medium hover:text-primary transition-colors"
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-primary"
          aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="absolute top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg">
            <div className="container py-4 flex flex-col gap-4">
              {navItems.map(({ link }, i) => {
                const href = link?.url || '/'
                const label = link?.label || ''
                const isExternal = href.startsWith('http')
                const isLast = i === navItems.length - 1

                if (isLast && isExternal) {
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-cta text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </a>
                  )
                }

                return (
                  <Link
                    key={i}
                    href={href}
                    className="text-xl font-medium py-2 border-b border-border/50 last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
