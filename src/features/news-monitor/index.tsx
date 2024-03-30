import React from 'react'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import MenuBar from '@/features/news-monitor/components/menu-bar'

const NewsMonitor = () => {
  return (
    <section className="flex flex-col h-full">
      <MenuBar />
      <div className="flex-1 border">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="p-2">hello</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="p-2">
            <textarea
              className="
            flex h-full w-full rounded-md border border-input
            bg-transparent text-sm shadow-sm placeholder:text-muted-foreground
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
            disabled:cursor-not-allowed disabled:opacity-50 resize-none p-4"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  )
}

export default NewsMonitor
