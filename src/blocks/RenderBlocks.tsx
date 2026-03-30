import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { GlassHeroBlock } from '@/blocks/GlassHero/Component'
import { FeaturesBlock } from '@/blocks/Features/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { ContactCTABlock } from '@/blocks/ContactCTA/Component'
import { PricingBlock } from '@/blocks/Pricing/Component'
import { EditableBlock } from '@/components/EditableBlock'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  glassHero: GlassHeroBlock,
  features: FeaturesBlock,
  testimonials: TestimonialsBlock,
  contactCTA: ContactCTABlock,
  pricing: PricingBlock,
}

const blockLabels: Record<string, string> = {
  glassHero: 'Hero',
  features: 'Sekcja',
  testimonials: 'Opinie',
  contactCTA: 'Kontakt',
  pricing: 'Cennik',
  content: 'Treść',
  cta: 'CTA',
  mediaBlock: 'Media',
  archive: 'Archiwum',
  formBlock: 'Formularz',
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  pageId?: number | string
  draft?: boolean
}> = ({ blocks, pageId, draft }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const rendered = (
                // @ts-expect-error there may be some mismatch between the expected types here
                <Block {...block} disableInnerContainer />
              )

              if (draft && pageId) {
                return (
                  <EditableBlock
                    key={index}
                    collection="pages"
                    id={pageId}
                    blockIndex={index}
                    blockType={blockLabels[blockType] || blockType}
                  >
                    {rendered}
                  </EditableBlock>
                )
              }

              return <Fragment key={index}>{rendered}</Fragment>
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
