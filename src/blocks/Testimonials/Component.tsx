'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import type { TestimonialsBlock as TestimonialsProps } from '@/payload-types'
import { Media } from '@/components/Media'

const renderStars = (rating: number = 5) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <svg
      key={i}
      className={`testimonial-star w-5 h-5 ${i < rating ? 'filled text-primary' : 'text-muted'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))
}

export const TestimonialsBlock: React.FC<TestimonialsProps> = ({
  sectionTitle,
  sectionDescription,
  testimonials,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )

  return (
    <section className="testimonials-section py-20 relative">
      <div className="container">
        {(sectionTitle || sectionDescription) && (
          <div className="testimonials-header text-center mb-16">
            {sectionTitle && (
              <h2 className="testimonials-title text-3xl md:text-4xl mb-4">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="testimonials-description text-lg text-muted-foreground max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Carousel */}
        <div className="testimonials-carousel" ref={emblaRef}>
          <div className="testimonials-carousel-container">
            {testimonials?.map((testimonial, index) => (
              <div key={index} className="testimonials-carousel-slide">
                <div className="testimonial-card p-6 rounded-lg border bg-card h-full">
                  {testimonial.rating && (
                    <div className="testimonial-rating flex gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                  )}

                  <p className="testimonial-quote mb-6 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="testimonial-author flex items-center gap-3">
                    {testimonial.avatar && typeof testimonial.avatar === 'object' ? (
                      <div className="testimonial-avatar relative w-12 h-12 rounded-full overflow-hidden">
                        <Media
                          resource={testimonial.avatar}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center font-semibold">
                        {testimonial.author?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="testimonial-name font-semibold">{testimonial.author}</p>
                      {testimonial.role && (
                        <p className="testimonial-role text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots navigation */}
        {testimonials && testimonials.length > 1 && (
          <div className="testimonials-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonials-dot ${index === selectedIndex ? 'active' : ''}`}
                onClick={() => scrollTo(index)}
                aria-label={`Opinia ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
