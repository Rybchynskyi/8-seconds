import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Create from "./components/Create";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Note from "./components/Note";
import Error from "./components/Error";



function App() {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-indigo-100 dark:from-zinc-900 dark:to-gray-900">
      <div className="main container mx-auto flex flex-col min-h-screen">
        <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={<Main/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route exact path="/note" element={<Note/>}/>
            <Route exact path="/note/:noteURL" element={<Note/>}/>
            <Route path="*" element={<Error/>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
    </div>
  );
}

export default App;
