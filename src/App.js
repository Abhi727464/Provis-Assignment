
import './App.css';
import Header from './components/Header';
import CardDetails from './components/CardDetails';
import Cards from './components/Cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setData(res.data);
      console.log(data);
    });
  }, []);

  return (
   <>
   <Header data={data}/>
   <Routes>
    <Route path='/' element={<Cards data={data}/>}/>
    <Route path='/cart/:id' element={<CardDetails data={data}/>}/>
   </Routes>
   </>
  );
}


export default App;
