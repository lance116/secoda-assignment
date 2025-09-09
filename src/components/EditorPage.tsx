'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { fetchBlogPost, type BlogPost } from '@/lib/api'
import { LivePreview } from '@/components/LivePreview'
import { SaveButton } from '@/components/SaveButton'
import { usePostMutation } from '@/hooks/usePostMutation'

export function EditorPage() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const isDirtyRef = useRef(false)
  const initializedRef = useRef(false)

  // fetch initial post data
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', '12345'],
    queryFn: () => fetchBlogPost('12345'),
  })

  // save mutation using custom hook
  const saveMutation = usePostMutation<BlogPost, BlogPost>({
    onSuccess: () => {
      isDirtyRef.current = false
    },
  })

  // memoized save handler
  const handleSave = useCallback(() => {
    if (title && content) {
      const postToSave: BlogPost = {
        id: '12345',
        title,
        content,
      }
      saveMutation.mutate(postToSave)
    }
  }, [title, content, saveMutation])

  // handle input changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    isDirtyRef.current = true
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    isDirtyRef.current = true
  }

  // initialize form when post data loads (only once)
  useEffect(() => {
    if (post && !initializedRef.current) {
      setTitle(post.title)
      setContent(post.content)
      initializedRef.current = true
    }
  }, [post])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">loading post...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>failed to load post</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto h-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">blog editor</h1>
          <p className="text-gray-600 mt-2">write and preview posts</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
          {/* editor section */}
          <Card className="flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <div>
                <Label htmlFor="title">title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="post title" 
                  className="mt-1"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <Label htmlFor="content">content</Label>
                <Textarea 
                  id="content" 
                  value={content}
                  onChange={handleContentChange}
                  placeholder="write your post content here (markdown supported)"
                  className="mt-1 flex-1 min-h-[400px]"
                />
              </div>
              <div className="flex-shrink-0">
                <SaveButton 
                  onSave={handleSave}
                  isDirty={isDirtyRef.current}
                  isSaving={saveMutation.isPending}
                />
              </div>
            </CardContent>
          </Card>

          {/* preview section */}
          <Card className="flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>live preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <LivePreview title={title} content={content} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
