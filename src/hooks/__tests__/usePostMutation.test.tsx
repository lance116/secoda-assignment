import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePostMutation } from '../usePostMutation'
import { saveBlogPost } from '@/lib/api'

// mock the api
jest.mock('@/lib/api', () => ({
  saveBlogPost: jest.fn()
}))

const mockSaveBlogPost = saveBlogPost as jest.MockedFunction<typeof saveBlogPost>

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('usePostMutation', () => {
  beforeEach(() => {
    mockSaveBlogPost.mockClear()
  })

  it('should call saveBlogPost when mutate is called', async () => {
    const mockPost = { id: '1', title: 'Test', content: 'Content' }
    mockSaveBlogPost.mockResolvedValue(mockPost)

    const { result } = renderHook(() => usePostMutation(), {
      wrapper: createWrapper()
    })

    result.current.mutate(mockPost)

    await waitFor(() => {
      expect(mockSaveBlogPost).toHaveBeenCalledWith(mockPost)
    })
  })

  it('should call onSuccess callback when mutation succeeds', async () => {
    const mockPost = { id: '1', title: 'Test', content: 'Content' }
    const onSuccess = jest.fn()
    mockSaveBlogPost.mockResolvedValue(mockPost)

    const { result } = renderHook(() => usePostMutation({ onSuccess }), {
      wrapper: createWrapper()
    })

    result.current.mutate(mockPost)

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('should call onError callback when mutation fails', async () => {
    const mockPost = { id: '1', title: 'Test', content: 'Content' }
    const onError = jest.fn()
    const error = new Error('Save failed')
    mockSaveBlogPost.mockRejectedValue(error)

    const { result } = renderHook(() => usePostMutation({ onError }), {
      wrapper: createWrapper()
    })

    result.current.mutate(mockPost)

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error)
    })
  })
})
