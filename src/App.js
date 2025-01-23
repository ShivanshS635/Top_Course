import React from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";
import { apiUrl, filterData } from "./data.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function App(){
  const [courses , setCourses] = useState([]);
  const [loading , setLoading] = useState(true);
  const [category , setCategory] = useState(filterData[0].title);

  console.log(category);

  async function fetchData(){
    setLoading(true);
    try{
      let res = await fetch(apiUrl);
      let data =await res.json();
      setCourses(data.data);
    }
    catch{
      toast.error("NETWORK ERROR");
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchData();
  },[]);

  return(
    <div className="min-h-screen flex-col flex bg-bgDark2">
      <div>
        <Navbar/>
      </div>
      <div className="bg-bgDark2">
        <Filter filterData = {filterData} category = {category} setCategory = {setCategory}/>
      </div>
      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
        {
          loading ? (<Spinner/>) : (<Cards courses = {courses} category = {category}/>)
        }
      </div>
    </div>
  )
};

export default App;
