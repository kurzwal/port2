import { ThemeProvider } from "styled-components";
import theme from "./style/theme";

import { PageScroll } from "./components/00_PageScroll";


function App() {
   return (
      <ThemeProvider theme={theme}>
         
         <PageScroll />
      </ThemeProvider>
   );
}

export default App;
