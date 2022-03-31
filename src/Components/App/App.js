import "./App.css";
import Header from "./../Header/Header";
import Form from "./../Main/Form/Form";
import { InputsProvider, UserProvider } from "../../Contexts/ContextProvider";
import React from "react";
import { LoginAuth } from "../Autheticator";
import Particles from "./../Particles/Particles";
import { Routes, Route } from "react-router-dom";
const LazyRegister = React.lazy(() => {
  return import("./../Main/Form/Form");
});
const LazyMain = React.lazy(() => {
  return import("./../Main/Main");
});

function App() {
  return (
    <UserProvider>
      <Particles />
      <InputsProvider>
        <div id="App">
          <header>
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="/bananas" element={<h1>Sup brutha</h1>} />
              <Route
                path="/register"
                element={
                  <React.Suspense fallback="Loading...">
                    <LazyRegister type="register" />
                  </React.Suspense>
                }
              />
              <Route path="/login" element={<Form type="login" />} />
              <Route
                path="/"
                element={
                  <LoginAuth>
                    <React.Suspense fallback="Loading...">
                      <LazyMain />
                    </React.Suspense>
                  </LoginAuth>
                }
              />
            </Routes>
          </main>
        </div>
      </InputsProvider>
    </UserProvider>
  );
}

export default App;
