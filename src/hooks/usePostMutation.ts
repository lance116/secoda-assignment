import { useMutation, useQueryClient } from '@tanstack/react-query'
import { saveBlogPost, type BlogPost } from '@/lib/api'

interface UsePostMutationOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function usePostMutation<TData = BlogPost, TVariables = BlogPost>(
  options?: UsePostMutationOptions
) {
  const queryClient = useQueryClient()

  return useMutation<TData, Error, TVariables>({
    mutationFn: (variables: TVariables) => saveBlogPost(variables as BlogPost) as Promise<TData>,
    onSuccess: () => {
      // invalidate and refetch the post data
      queryClient.invalidateQueries({ queryKey: ['blogPost', '12345'] })
      options?.onSuccess?.()
    },
    onError: (error) => {
      options?.onError?.(error)
    },
  })
}
