import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

import "./scss/index.scss";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import Search from "./pages/Search";
import Mylist from "./pages/Mylist";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import { useAppDispatch, useAppSelector } from "./redux-store/hook";
import { useEffect } from "react";
import { clearToast } from "./redux-store/slices/AppSlice";

function App() {
  const toasts = useAppSelector((state) => state.app.toasts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasts.length) {
      const toastOptions:ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      toasts.forEach((mssg: string) => {
        toast(mssg, toastOptions);
      });

      dispatch(clearToast())
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />

          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<Mylist />} path="/list" />
            <Route element={<About />} path="/about" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<Pokemon />} path="/pokemon/:id" />

            {/* default route if not rout is matched */}
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
