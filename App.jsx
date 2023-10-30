import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayOut from "./pages/AppLayOut";
import Login from "./pages/Login";
import City from "./components/City";
import CityItem from "./components/CityItem";
import CityList from "./components/CityList";
import SideBar from "./components/SideBar";
import Button from "./pages/Button";
import SplittedPage from "./pages/SplittedPage";

export default function App() {
  // const countRef = useRef(0);
  // const [name, setShowName] = useState("");
  // const [surname, setSurName] = useState("");
  // // const [button, clickButton] = useState("");

  // const handleClickButton = () => {
  //   setSurName("Tourli");
  // };
  // useEffect(() => {
  //   countRef.current = countRef.current + 1;
  // }, [countRef.current]);

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "http://localhost:8000";
  console.log(`${BASE_URL}/cities`);
  useEffect(() => {
    async function returnCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log("🚀 ~ file: App.jsx:38 ~ returnCities ~ res:", res);
        setCities(data);
        // console.log(data);
      } catch (error) {
        console.log("Error fetching the data", error);
      } finally {
        setIsLoading(false);
      }
    }
    returnCities();
  }, []);

  return (
    <BrowserRouter>
      {/* <input
        type="string"
        placeholder="Insert your name"
        onChange={(e) => setShowName(e.target.value)}
      /> */}
      {/* <div>My name is {name}</div> */}
      {/* <button onClick={handleClickButton}>Click me</button>
      && <div>My surname is {surname} </div>
      {/* see that with the button click the page does not render */}
      {/* <div>I rendered {countRef.current} times</div>
      <br />
      <br />  */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayOut />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="sidebar" element={<SideBar />} />
        <Route path="button" element={<Button />} />
        <Route path="city" element={<City />} />
        <Route path="city_item" element={<CityItem />} />
        <Route path="splitted_page" element={<SplittedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
