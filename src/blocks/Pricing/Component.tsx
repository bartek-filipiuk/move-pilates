import React from 'react'

import type { PricingBlock as PricingProps } from '@/payload-types'

export const PricingBlock: React.FC<PricingProps> = ({
  sectionTitle,
  sectionDescription,
  packages,
  carnets,
}) => {
  return (
    <section className="pricing-section py-20">
      <div className="container">
        {(sectionTitle || sectionDescription) && (
          <div className="pricing-header text-center mb-16">
            {sectionTitle && (
              <h2 className="pricing-title text-3xl md:text-4xl mb-4">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="pricing-description text-lg text-muted-foreground max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Packages grid */}
        {packages && packages.length > 0 && (
          <div className="pricing-grid">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`pricing-card ${pkg.highlighted ? 'highlighted' : ''}`}
              >
                <h3 className="pricing-card-title">{pkg.title}</h3>
                <div className="pricing-price">{pkg.price}</div>
                {pkg.duration && (
                  <div className="pricing-duration">{pkg.duration}</div>
                )}
                {pkg.description && (
                  <p className="pricing-card-description">{pkg.description}</p>
                )}
                {pkg.ctaLabel && pkg.ctaUrl && (
                  <a href={pkg.ctaUrl} className="pricing-cta">
                    {pkg.ctaLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Carnets section */}
        {carnets && carnets.length > 0 && (
          <div className="carnets-section">
            <h3 className="carnets-title">Karnety</h3>
            <div className="carnets-grid">
              {carnets.map((carnet, index) => (
                <div key={index} className="carnet-card">
                  <div className="carnet-title">{carnet.title}</div>
                  <div className="carnet-price">{carnet.price}</div>
                  {carnet.description && (
                    <p className="carnet-description">{carnet.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
