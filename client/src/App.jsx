import React from 'react'
import { ApolloClient, InMemoryCache, HttpLink, } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Navbar from './Components/Navbar'
import LensMouse from './LensMouse'
import Homepage from './Homepage'
import SolarSystem from './Components/SolarSystem'
import Planet from "./Components/Planet";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "http://localhost:4000" }),
});

return (
    <ApolloProvider client={client}>
      <div className="h-screen bg-cover bg-center relative" 
         style={{ backgroundImage: "url('/galaxy.jpg')" }}
         >
      <Router>
        <Navbar />
        <LensMouse />

        <Routes>
          
          <Route path="/" element={<Homepage />} />
          <Route path="/SolarSystem" element={<SolarSystem />} />
          <Route path="/planet/:name" element={<Planet />} /> 

        </Routes>
      </Router>
    </div>
    </ApolloProvider>
    
  );
}



export default App;
