import { useMutation, useQueryClient } from '@tanstack/react-query'
import { saveBlogPost, type BlogPost } from '@/lib/api'

interface MutationCallbacks {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function usePostMutation<TData = BlogPost, TVariables = BlogPost>(
  callbacks?: MutationCallbacks
) {
  const queryClient = useQueryClient()

  return useMutation<TData, Error, TVariables>({
    mutationFn: (variables: TVariables) => saveBlogPost(variables as BlogPost) as Promise<TData>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPost', '12345'] })
      callbacks?.onSuccess?.()
    },
    onError: (error) => {
      callbacks?.onError?.(error)
    },
  })
}
