import { ModeToggle } from '@/components/base/mode-toggle'
import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'
import React from 'react'

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="container">
      <div className="flex items-center justify-between py-1 h-9">
        <div>News Monitor</div>
        <Switch
          checked={theme === 'dark' ? true : false}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </div>
    </header>
  )
}

export default Header
