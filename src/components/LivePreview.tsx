'use client'

import { memo, useMemo } from 'react'

// simple markdown to html conversion (simulates expensive operation)
function convertMarkdownToHtml(markdown: string): string {
  // simulate processing delay
  const start = Date.now()
  while (Date.now() - start < 50) {
    // busy wait to simulate expensive operation
  }

  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>')
}

interface LivePreviewProps {
  title: string
  content: string
}

export const LivePreview = memo(function LivePreview({ title, content }: LivePreviewProps) {
  // memoize the expensive markdown conversion
  const htmlContent = useMemo(() => {
    if (!title.trim() && !content.trim()) {
      return '<p className="text-gray-500 italic">preview will appear here</p>'
    }
    
    let html = ''
    if (title.trim()) {
      html += `<h1 className="text-2xl font-bold mb-4">${title}</h1>`
    }
    if (content.trim()) {
      html += convertMarkdownToHtml(content)
    }
    return html
  }, [title, content])

  return (
    <div className="h-full min-h-[400px] p-4 bg-white">
      <div 
        className="prose prose-sm max-w-none h-full"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
})
