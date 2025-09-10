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
      const promise = fetchBlogPost()
      
      // fast-forward timers
      jest.runAllTimers()
      
      const result = await promise
      
      expect(result).toEqual({
        id: '12345',
        title: 'My First Reactive Post',
        content: '# Hello World\n\nThis is my post content. It supports **markdown**!'
      })
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
      expect(consoleSpy).toHaveBeenCalledWith('Post saved successfully:', post)
      
      consoleSpy.mockRestore()
    })
  })
})
