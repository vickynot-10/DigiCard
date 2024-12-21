import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PageRoutes from "./Components/PageRoutes/Pageroutes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <PageRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
