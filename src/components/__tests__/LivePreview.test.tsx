import { render, screen } from '@testing-library/react'
import { LivePreview } from '../LivePreview'

describe('LivePreview', () => {
  it('should render placeholder when no content', () => {
    render(<LivePreview title="" content="" />)
    
    expect(screen.getByText('preview will appear here')).toBeInTheDocument()
  })

  it('should render title as h1', () => {
    render(<LivePreview title="Test Title" content="" />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
  })

  it('should render markdown content', () => {
    render(<LivePreview title="" content="# Heading\n\n**bold text**" />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading')
    expect(screen.getByText('bold text')).toBeInTheDocument()
  })

  it('should render both title and content', () => {
    render(<LivePreview title="My Post" content="Some content" />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Post')
    expect(screen.getByText('Some content')).toBeInTheDocument()
  })

  it('should handle markdown formatting', () => {
    render(<LivePreview title="" content="**bold** and *italic*" />)
    
    const boldElement = screen.getByText('bold')
    const italicElement = screen.getByText('italic')
    
    expect(boldElement.tagName).toBe('STRONG')
    expect(italicElement.tagName).toBe('EM')
  })
})
