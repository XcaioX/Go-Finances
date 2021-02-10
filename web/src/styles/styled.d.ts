/* eslint @typescript-eslint/no-empty-interface: "off" */
import 'styled-components'

import { ThemesProps } from './themes/ThemeProps'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemesProps {}
}
