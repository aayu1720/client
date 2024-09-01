import SideBar from "./components/SideBar";
import MainPage from "./components/MainPage";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="displayPage">
        <SideBar />
        <MainPage />
      </div>
    </AppProvider>
  );
}

export default App;
