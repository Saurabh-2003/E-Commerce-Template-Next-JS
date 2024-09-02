import { Montserrat, DM_Serif_Display} from 'next/font/google'

const fontSans = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  preload: true,
  display: 'swap'
})
const DmSherif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sans',
  preload: true,
  display: 'swap'
})
export { fontSans, DmSherif }
