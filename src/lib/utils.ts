import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  return format(date, 'PPP', { locale: ko })
}
