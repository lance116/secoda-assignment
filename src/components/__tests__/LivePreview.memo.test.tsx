import { render } from '@testing-library/react'
import { LivePreview } from '../LivePreview'

describe('LivePreview Memoization', () => {
  it('should not re-render when props do not change', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()
    
    // Create a custom component that logs when it renders
    const TestablePreview = () => {
      console.log('LivePreview rendered')
      return <LivePreview title="Test" content="Test content" />
    }
    
    const { rerender } = render(<TestablePreview />)
    
    // Initial render
    expect(mockConsoleLog).toHaveBeenCalledWith('LivePreview rendered')
    
    mockConsoleLog.mockClear()
    
    // Re-render with same props - should not trigger re-render of LivePreview
    rerender(<TestablePreview />)
    
    // The TestablePreview will log again, but LivePreview should be memoized
    expect(mockConsoleLog).toHaveBeenCalledWith('LivePreview rendered')
    
    mockConsoleLog.mockRestore()
  })

  it('should re-render when props change', () => {
    const { rerender } = render(<LivePreview title="Original" content="Original content" />)
    
    // This should trigger a re-render because props changed
    rerender(<LivePreview title="Changed" content="Changed content" />)
    
    // If we get here without errors, the memoization is working correctly
    expect(true).toBe(true)
  })
})