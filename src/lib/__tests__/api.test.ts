import { fetchBlogPost, saveBlogPost } from '../api'

// mock timers for testing async delays
jest.useFakeTimers()

describe('api functions', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
  })

  describe('fetchBlogPost', () => {
    it('should return a blog post after delay', async () => {
      const promise = fetchBlogPost('12345')
      
      // fast-forward timers
      jest.runAllTimers()
      
      const result = await promise
      
      expect(result).toEqual({
        id: '12345',
        title: 'sample post',
        content: '# hello world\n\nthis is some sample content with **markdown** support'
      })
    })

    it('should handle different post ids', async () => {
      const promise = fetchBlogPost('different-id')
      
      jest.runAllTimers()
      
      const result = await promise
      
      // currently returns same post regardless of id
      expect(result.id).toBe('12345')
    })
  })

  describe('saveBlogPost', () => {
    it('should save a blog post and return it', async () => {
      const post = {
        id: '12345',
        title: 'test post',
        content: 'test content'
      }

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      const promise = saveBlogPost(post)
      
      jest.runAllTimers()
      
      const result = await promise
      
      expect(result).toEqual(post)
      expect(consoleSpy).toHaveBeenCalledWith('post saved:', post)
      
      consoleSpy.mockRestore()
    })
  })
})
