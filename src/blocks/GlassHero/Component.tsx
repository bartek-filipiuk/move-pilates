import React from 'react'

import type { GlassHeroBlock as GlassHeroProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const GlassHeroBlock: React.FC<GlassHeroProps> = ({
  layout,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundMedia,
}) => {
  const isSplit = layout === 'split' && backgroundMedia && typeof backgroundMedia === 'object'

  if (isSplit) {
    return (
      <section className="hero-section relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="hero-background absolute inset-0" />
        <div className="container relative z-10">
          <div className="hero-split">
            {/* Left: Text content */}
            <div className="hero-split-content py-8 md:py-12">
              {headline && (
                <h1 className="hero-headline text-4xl md:text-5xl lg:text-6xl mb-6">
                  {headline}
                </h1>
              )}

              {subheadline && (
                <div className="hero-subheadline text-lg md:text-xl mb-8 max-w-xl">
                  <RichText data={subheadline} enableGutter={false} />
                </div>
              )}

              {(primaryCTA?.label || secondaryCTA?.label) && (
                <div className="hero-cta-container flex flex-col sm:flex-row gap-4">
                  {primaryCTA && primaryCTA.label && (
                    <CMSLink
                      {...primaryCTA}
                      size="lg"
                      className="hero-cta-primary"
                    />
                  )}
                  {secondaryCTA && secondaryCTA.label && (
                    <CMSLink
                      {...secondaryCTA}
                      size="lg"
                      className="hero-cta-secondary"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Right: Media */}
            <div className="hero-split-media">
              <Media
                resource={backgroundMedia}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Centered layout (default)
  return (
    <section className="hero-section hero-centered relative py-8 md:py-12 flex items-center justify-center overflow-hidden">
      <div className="hero-background absolute inset-0" />

      {backgroundMedia && typeof backgroundMedia === 'object' && (
        <div className="absolute inset-0">
          <Media
            resource={backgroundMedia}
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
      )}

      <div className="container relative z-10">
        <div className="hero-content max-w-4xl mx-auto text-center py-2">
          {headline && (
            <h1 className="hero-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {headline}
            </h1>
          )}

          {subheadline && (
            <div className="hero-subheadline text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              <RichText data={subheadline} enableGutter={false} />
            </div>
          )}

          {(primaryCTA?.label || secondaryCTA?.label) && (
            <div className="hero-cta-container flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCTA && primaryCTA.label && (
                <CMSLink
                  {...primaryCTA}
                  size="lg"
                  className="hero-cta-primary"
                />
              )}
              {secondaryCTA && secondaryCTA.label && (
                <CMSLink
                  {...secondaryCTA}
                  size="lg"
                  className="hero-cta-secondary"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
