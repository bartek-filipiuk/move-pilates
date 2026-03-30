'use client'

import React from 'react'
import { Pencil } from 'lucide-react'

interface EditableBlockProps {
  children: React.ReactNode
  collection: string
  id: number | string
  blockIndex: number
  blockType: string
}

export const EditableBlock: React.FC<EditableBlockProps> = ({
  children,
  collection,
  id,
  blockIndex,
  blockType,
}) => {
  const adminUrl = `/admin/collections/${collection}/${id}#field-layout__${blockIndex}`

  return (
    <div className="editable-block group/edit relative">
      {children}
      <a
        href={adminUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="editable-block-button"
        title={`Edytuj: ${blockType}`}
      >
        <Pencil className="w-4 h-4" />
        <span className="editable-block-label">{blockType}</span>
      </a>
    </div>
  )
}
