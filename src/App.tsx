import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

import "./scss/index.scss";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";

import { useAppDispatch, useAppSelector } from "./redux-store/hook";
import { useEffect } from "react";
import { clearToast, setUserStatus } from "./redux-store/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/FirebaseConfig";
import Loader from "./components/Loader";


//lazy Loading
const Search = lazy(() => import("./pages/Search"));
const MyList = lazy(() => import("./pages/Mylist"));
const About = lazy(() => import("./pages/About"));
const Compare = lazy(() => import("./pages/Compare"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

function App() {
  const toasts = useAppSelector((state) => state.app.toasts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // this will grab the firebase authentication after refresh if the user is already logged in
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      toasts.forEach((mssg: string) => {
        toast(mssg, toastOptions);
      });

      dispatch(clearToast());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <div className="app">
            <Navbar />
            <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<MyList />} path="/list" />
              <Route element={<About />} path="/about" />
              <Route element={<Compare />} path="/compare" />
              <Route element={<Pokemon />} path="/pokemon/:id" />

              {/* default route if not rout is matched */}
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;


//hosting
//npm i netlify-cli -g 

//npx deploy --prod