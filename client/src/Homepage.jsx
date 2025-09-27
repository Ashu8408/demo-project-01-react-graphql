import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-center">
      {/* Card 1 (with nested Card 2 inside) */}
      <div
        name="card_1"
        className="w-3/4 min-h-[75vh] p-6 border-8 border-gray-800 rounded-lg flex flex-col items-center justify-center space-y-6 play-on-hover"
      >
        {/* Jupiter Title */}
        <p className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center">
          J u p i t e r
        </p>

        {/* Nested Card 2 */}
        <div
          name="card_2"
          className="w-full p-6 border border-gray-950 rounded-lg bg-white/5 backdrop-blur-sm"
        >
          <p className="font-serif text-white text-md text-center">
            Jupiter is the largest planet in the Solar System, a gas giant with
            a diameter of about 142,984 km. It has a mass more than twice that
            of all the other planets combined. Jupiter is best known for its
            colorful cloud bands and the Great Red Spot, a massive storm larger
            than Earth that has raged for centuries. Its atmosphere is mostly
            hydrogen and helium, with ammonia clouds and violent weather
            patterns driven by fast rotation—it completes one day in just under
            10 hours. Jupiter emits more heat than it receives from the Sun, due
            to slow gravitational contraction. The planet has a strong magnetic
            field and an enormous magnetosphere that extends millions of
            kilometers into space. Jupiter is orbited by a vast system of moons,
            the largest being the Galilean moons: Io, Europa, Ganymede, and
            Callisto. Each of these moons is unique—Europa may harbor a
            subsurface ocean, while Io is volcanically active. Jupiter also has
            faint rings composed of dust particles. Because of its size,
            composition, and influence, Jupiter is sometimes called the “vacuum
            cleaner” of the Solar System, as its gravity deflects comets and
            asteroids. Studying Jupiter provides insights into gas giant
            formation and the early Solar System.
          </p>
        </div>
      </div>
    </div>
  );
}
