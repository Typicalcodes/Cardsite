import Cards from "./Components/Cards";
import { Route, Routes } from "react-router-dom";
import  Teamlist  from "./Components/Teamlist";
import Profile from "./Components/Profile";
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
        <Route
          path="/profile"
          Component={Profile}
        />
    </Routes>
  );
}

export default App;
