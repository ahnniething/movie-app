// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    mainBgColor : string;
    titleColor : string;
    textColor : string;
  }
}