import Cards from "./Components/Cards";
import { Route, Routes } from "react-router-dom";
import  Teamlist  from "./Components/Teamlist";
// main app
function App() {
  return (
    <Routes>
        <Route
          path="/"
          Component={Cards}
        />
        <Route
          path="/team"
          Component={Teamlist}
        />
    </Routes>
  );
}

export default App;
