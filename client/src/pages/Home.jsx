import React from 'react';
import Products from '../components/Products/Products';
import backgroundImage from '../assets/hero/pexels-rachel-claire-5864245.jpg'; // Import the image file
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
// import { Button } from "@material-tailwind/react";
import {
  Button,
} from "@material-tailwind/react";

import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

const Home = ({ loggedUser }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const nav = useNavigate()

  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the container takes up at least the height of the viewport
  };

  return (
    <div>
      <div style={style}>
        {/* <h1>WELCOME TO OUR PLATFORM</h1> */}
        <div className="flex flex-col justify-center items-center min-h-screen">
          {/* <button
            onClick={() => nav(`/post/create/${loggedUser.username}`)}
            className="relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50 overflow-hidden h-14 w-56 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold"
          >
            <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
            <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
            <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
            <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
            <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
            <p className="z-10">Create a post</p>
          </button> */}
          <SearchBar />
          <div className="flex w-max gap-4">
            <Button variant="gradient"><Link to="/posts" className="flex items-center hover:text-gray-200">See More ...</Link></Button>
          </div>
        </div>
      </div>
      <Products handleOrderPopup={handleOrderPopup} loggedUser={loggedUser} />
    </div>
  );
};

export default Home;
