import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'My Website'

  return (
    <span
      className={clsx('font-serif text-xl font-medium tracking-wide', className)}
      aria-label={`${siteName} Logo`}
    >
      {siteName}
    </span>
  )
}
