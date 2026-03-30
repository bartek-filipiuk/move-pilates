import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, SiteSetting } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { SocialLinks } from '@/components/SocialLinks'
import { ContactInfo } from '@/components/ContactInfo'
import { NewsletterForm } from '@/components/NewsletterForm'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)() as Footer
  const siteSettings = await getCachedGlobal('site-settings', 1)() as SiteSetting

  const navItems = footerData?.navItems || []
  const showSocialLinks = footerData?.showSocialLinks ?? true
  const showContactInfo = footerData?.showContactInfo ?? true
  const showNewsletter = footerData?.showNewsletter ?? true

  return (
    <footer className="footer-wrapper mt-auto border-t border-border">
      <div className="container py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo Column */}
          <div>
            <Link className="flex items-center mb-4" href="/">
              <Logo />
            </Link>
            {siteSettings?.siteName && (
              <p className="footer-muted text-sm">{siteSettings.siteName}</p>
            )}
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="footer-heading font-semibold mb-4">Nawigacja</h4>
            <nav className="flex flex-col gap-2">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="footer-link transition-colors"
                    key={i}
                    {...link}
                    appearance="inline"
                  />
                )
              })}
            </nav>
          </div>

          {/* Contact Info Column */}
          {showContactInfo && siteSettings?.contact && (
            <div>
              <h4 className="footer-heading font-semibold mb-4">Kontakt</h4>
              <ContactInfo contact={siteSettings.contact} />
            </div>
          )}

          {/* Newsletter Column */}
          {showNewsletter && (
            <div>
              <h4 className="footer-heading font-semibold mb-4">
                {footerData?.newsletterTitle || 'Newsletter'}
              </h4>
              {footerData?.newsletterDescription && (
                <p className="footer-muted text-sm mb-4">
                  {footerData.newsletterDescription}
                </p>
              )}
              <NewsletterForm />
            </div>
          )}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t footer-border">
          <div className="flex items-center gap-4">
            <span className="footer-muted text-sm">
              &copy; {new Date().getFullYear()} {siteSettings?.siteName || 'Wszelkie prawa zastrzeżone'}
            </span>
          </div>

          {/* Social Links */}
          {showSocialLinks && siteSettings?.socialLinks && (
            <SocialLinks links={siteSettings.socialLinks} />
          )}
        </div>
      </div>
    </footer>
  )
}
