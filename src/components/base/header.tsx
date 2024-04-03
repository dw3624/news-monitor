import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="container">
      <div className="flex items-center justify-between py-2 h-12">
        <div className="flex items-center justify-center font-bold">
          News Monitor
        </div>
        <Switch
          checked={theme === 'dark' ? true : false}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </div>
    </header>
  )
}

export default Header
