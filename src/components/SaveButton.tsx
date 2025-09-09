'use client'

import { Button } from '@/components/ui/button'

interface SaveButtonProps {
  onSave: () => void
  isDirty: boolean
  isSaving: boolean
}

export function SaveButton({ onSave, isDirty, isSaving }: SaveButtonProps) {
  return (
    <div className="space-y-2">
      <Button 
        className="w-full" 
        onClick={onSave}
        disabled={!isDirty || isSaving}
      >
        {isSaving ? 'saving...' : 'save post'}
      </Button>
      {isDirty && (
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <span>unsaved changes</span>
        </div>
      )}
    </div>
  )
}
