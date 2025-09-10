import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EditorPage } from '../EditorPage'
import { fetchBlogPost, saveBlogPost } from '@/lib/api'

// Mock the API
jest.mock('@/lib/api', () => ({
  fetchBlogPost: jest.fn(),
  saveBlogPost: jest.fn()
}))

const mockFetchBlogPost = fetchBlogPost as jest.MockedFunction<typeof fetchBlogPost>
const mockSaveBlogPost = saveBlogPost as jest.MockedFunction<typeof saveBlogPost>

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('EditorPage', () => {
  beforeEach(() => {
    mockFetchBlogPost.mockClear()
    mockSaveBlogPost.mockClear()
  })

  it('should load and display initial post data', async () => {
    const mockPost = {
      id: '12345',
      title: 'Test Post',
      content: '# Test Content'
    }
    
    mockFetchBlogPost.mockResolvedValue(mockPost)
    
    renderWithQueryClient(<EditorPage />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument()
      expect(screen.getByDisplayValue('# Test Content')).toBeInTheDocument()
    })
  })

  it('should show save button as disabled initially (clean state)', async () => {
    const mockPost = {
      id: '12345',
      title: 'Test Post',
      content: '# Test Content'
    }
    
    mockFetchBlogPost.mockResolvedValue(mockPost)
    
    renderWithQueryClient(<EditorPage />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument()
    })
    
    const saveButton = screen.getByRole('button', { name: /save post/i })
    expect(saveButton).toBeDisabled()
  })

  it('should enable save button when content is modified (dirty state)', async () => {
    const mockPost = {
      id: '12345',
      title: 'Test Post',
      content: '# Test Content'
    }
    
    mockFetchBlogPost.mockResolvedValue(mockPost)
    
    renderWithQueryClient(<EditorPage />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument()
    })
    
    const titleInput = screen.getByDisplayValue('Test Post')
    fireEvent.change(titleInput, { target: { value: 'Modified Title' } })
    
    const saveButton = screen.getByRole('button', { name: /save post/i })
    expect(saveButton).toBeEnabled()
    expect(screen.getByText('unsaved changes')).toBeInTheDocument()
  })

  it('should call save mutation when save button is clicked', async () => {
    const mockPost = {
      id: '12345',
      title: 'Test Post',
      content: '# Test Content'
    }
    
    mockFetchBlogPost.mockResolvedValue(mockPost)
    mockSaveBlogPost.mockResolvedValue({
      id: '12345',
      title: 'Modified Title',
      content: '# Test Content'
    })
    
    renderWithQueryClient(<EditorPage />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument()
    })
    
    const titleInput = screen.getByDisplayValue('Test Post')
    fireEvent.change(titleInput, { target: { value: 'Modified Title' } })
    
    const saveButton = screen.getByRole('button', { name: /save post/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(mockSaveBlogPost).toHaveBeenCalledWith({
        id: '12345',
        title: 'Modified Title',
        content: '# Test Content'
      })
    })
  })

  it('should disable save button after successful save (clean state restored)', async () => {
    const mockPost = {
      id: '12345',
      title: 'Test Post',
      content: '# Test Content'
    }
    
    mockFetchBlogPost.mockResolvedValue(mockPost)
    mockSaveBlogPost.mockResolvedValue({
      id: '12345',
      title: 'Modified Title',
      content: '# Test Content'
    })
    
    renderWithQueryClient(<EditorPage />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument()
    })
    
    const titleInput = screen.getByDisplayValue('Test Post')
    fireEvent.change(titleInput, { target: { value: 'Modified Title' } })
    
    const saveButton = screen.getByRole('button', { name: /save post/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(saveButton).toBeDisabled()
      expect(screen.queryByText('unsaved changes')).not.toBeInTheDocument()
    })
  })
})