import "./App.css";
import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, Outlet, createBrowserRouter} from "react-router-dom";
import Error from "./components/Error"

function App() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}



export default App;
