'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { SidebarList } from '@/components/sidebar-list'
import { useClass } from '@/lib/hooks/class-context'
import { useBackground } from '@/lib/hooks/background-context'
import classTypes from '@/public/data/classTypes'
import backgrounds from '@/public/data/backgrounds'

interface ChatHistoryProps {}
const settingTitle = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between p-4">
    <h4 className="text-sm font-medium">{title}</h4>
  </div>
)

export function ChatHistory({}: ChatHistoryProps) {
  const { selectedClass, setSelectedClass } = useClass()
  const { selectedBackground, setSelectedBackground } = useBackground()

  return (
    <div className="flex flex-col h-full justify-between">
      {settingTitle({ title: 'Class Types' })}

      {/* Scrollable Class Types Section */}
      <div className="mb-2 px-4 flex-1 overflow-auto">
        <ul className="space-y-2 mt-2">
          {classTypes.map((classType, index) => (
            <li
              key={index}
              onClick={() => setSelectedClass(classType.id)}
              className={cn(
                'p-2 border border-zinc-200 rounded-md cursor-pointer dark:border-zinc-700 dark:bg-zinc-800',
                selectedClass === classType.id
                  ? 'bg-blue-200 dark:bg-blue-700'
                  : ''
              )}
            >
              <span className="text-base font-medium">
                {classType.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {settingTitle({ title: 'Backgrounds' })}

      {/* Scrollable Background Options Section */}

      <div className="mb-2 px-4 flex-1 overflow-auto">
        <ul className="space-y-2 mt-2">
          {backgrounds.map((background, index) => (
            <li
              key={index}
              onClick={() => setSelectedBackground(background.id)}
              className={cn(
                'p-2 border border-zinc-200 rounded-md cursor-pointer dark:border-zinc-700 dark:bg-zinc-800',
                selectedBackground === background.id
                  ? 'bg-blue-200 dark:bg-blue-700'
                  : ''
              )}
            >
              <span className="text-base font-medium">{background.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        <SidebarList />
      </React.Suspense>
    </div>
  )
}
