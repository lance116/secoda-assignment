import { render, screen, fireEvent } from '@testing-library/react'
import { SaveButton } from '../SaveButton'

describe('SaveButton', () => {
  const mockOnSave = jest.fn()

  beforeEach(() => {
    mockOnSave.mockClear()
  })

  it('should be disabled when not dirty', () => {
    render(<SaveButton onSave={mockOnSave} isDirty={false} isSaving={false} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('save post')
  })

  it('should be enabled when dirty and not saving', () => {
    render(<SaveButton onSave={mockOnSave} isDirty={true} isSaving={false} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeEnabled()
    expect(button).toHaveTextContent('save post')
  })

  it('should be disabled when saving', () => {
    render(<SaveButton onSave={mockOnSave} isDirty={true} isSaving={true} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('saving...')
  })

  it('should call onSave when clicked', () => {
    render(<SaveButton onSave={mockOnSave} isDirty={true} isSaving={false} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockOnSave).toHaveBeenCalledTimes(1)
  })

  it('should show dirty indicator when dirty', () => {
    render(<SaveButton onSave={mockOnSave} isDirty={true} isSaving={false} />)
    
    expect(screen.getByText('unsaved changes')).toBeInTheDocument()
    expect(screen.getByTestId('dirty-indicator')).toBeInTheDocument()
  })

  it('should not show dirty indicator when not dirty', () => {
    render(<SaveButton onSave={mockOnSave} isDirty={false} isSaving={false} />)
    
    expect(screen.queryByText('unsaved changes')).not.toBeInTheDocument()
  })
})
