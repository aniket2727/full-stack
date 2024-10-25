

import { BrowserRouter,Routes} from "react-router-dom";


import NavbarComponent from "./component/Header/NavbarComponent";
function App() {
  return (
    <div>
        <BrowserRouter>
           <NavbarComponent/>
           <Routes>
               
           </Routes>
        </BrowserRouter>
  
    </div>
  );
}

export default App;
