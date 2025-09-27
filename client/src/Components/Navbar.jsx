import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";

// import PLANETS from "../data.js";

const QUERY_ALL_PLANETS = gql`
  query GetAllPlanets {
    planets {
      id
      name
      menu_image
    }
  }
`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const flyoutRef = useRef(null);
  const btnRef = useRef(null);
  
  const { data: planetData, error: planetError } = useQuery( QUERY_ALL_PLANETS);


  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
    
    if (planetData){
    console.log(planetData)
    }
    if (planetError){
    console.log(planetError)
    }

  return (
    <nav className="fixed w-full z-50 ">
      <div className="mx-auto px-4">
        <div className="flex items-center h-16 ">
          {/* Menu Button */}
          <Link
            to="/"
            className="hover:opacity-80 focus:outline-none text-2xl cursor-none"
          >
            <img src="./home.jpg" alt="home icon" className="w-10 mr-5" />
          </Link>
          <button
            ref={btnRef}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="hover:opacity-80 focus:outline-none text-2xl cursor-none"
          >
            <img src="./solar_system.gif" alt="menu icon" className="w-20" />
          </button>
        </div>
      </div>

      {/* Flyout Menu (3 columns) */}
      <div
        ref={flyoutRef}
        className={`absolute inset-x-0 top-full z-20 transition-all duration-200 ease-out ${
          isOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        } origin-top`}
      >
        <div className="px-20 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[100vh] overflow-y-auto">
          {/* Column 1 */}
          <div className="rounded-3xl overflow-hidden">
            <Link to ="/solarsystem">
              <img
                src="./solar_system_menu.jpg"
                alt="Explore Solar System"
                className="h-auto max-h-[70vh] object-cover cursor-none rounded-3xl"
              />
            </Link>
          </div>

          {/* Column 2 */}
         {planetData?.planets?.map((planet) => (
          <Link to={`/planet/${planet.name.toLowerCase()}`} key={planet.name.toLowerCase()}>
          <img
            src={planet.menu_image.toLowerCase()}
            alt={planet.name.toLowerCase()}
            className="h-auto max-h-[70vh] object-cover rounded-3xl cursor-none hover:scale-105 transition"
          />
        </Link>
      ))}

          

        </div>
      </div>
    </nav>
    // <div className="text-2xl bg-green-00"> navbar </div>
  );
}
