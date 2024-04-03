import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'
import { Mail } from 'lucide-react'

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="container">
      <div className="flex items-center justify-between py-2 h-12">
        <div className="flex items-center justify-center font-bold">
          News Monitor
        </div>
        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:dw3624@gmail.com"
            className="inline-flex items-center justify-center text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            <Mail className="w-3 h-3 mr-1.5" />
            의견 보내기
          </a>

          <Switch
            checked={theme === 'dark' ? true : false}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
