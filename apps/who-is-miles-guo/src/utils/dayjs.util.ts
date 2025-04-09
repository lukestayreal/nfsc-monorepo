import dayjs from 'dayjs'
import { LocaleEnum } from '../../constants/app.constants'
import 'dayjs/locale/zh-cn' // 导入本地化语言

export const displayDate = (locale: LocaleEnum, date: string | null) => {
  if (!date) return locale === 'en' ? 'Invalid date' : '没有日期'

  if (locale) {
    dayjs.locale(locale === 'en' ? 'en' : 'zh-cn')
  }

  return dayjs(date).format(locale === 'en' ? 'MMMM D, YYYY' : 'YYYY年 MMMMD日')
}
