import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function BlogEditor() {
  // state management for form inputs
  // const [title, setTitle] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">blog editor</h1>
          <p className="text-gray-600 mt-2">write and preview posts</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* editor section */}
          <Card>
            <CardHeader>
              <CardTitle>editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">title</Label>
                <Input 
                  id="title" 
                  placeholder="post title" 
                  className="mt-1"
                  // onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="content">content</Label>
                <Textarea 
                  id="content" 
                  placeholder="write your post content here (markdown supported)"
                  className="mt-1 min-h-[400px]"
                  // onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <Button className="w-full" disabled>
                save post {/* not implemented yet */}
              </Button>
              {/* <Button className="w-full mt-2" variant="outline">
                load sample
              </Button> */}
            </CardContent>
          </Card>

          {/* preview section */}
          <Card>
            <CardHeader>
              <CardTitle>live preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px] p-4 border rounded-md bg-white">
                <p className="text-gray-500 italic">preview will appear here</p>
                {/* markdown preview not implemented */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">loading editor...</p>
        </div>
      </div>
    }>
      <BlogEditor />
    </Suspense>
  );
}

// error boundary would be good to add
