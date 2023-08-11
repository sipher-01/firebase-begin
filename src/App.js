import { useEffect, useState, useCallback } from "react";
import "./App.css";
import { Auth } from "./component/auth";
import Movie from "./component/movie";


function App() {
  return (
    <div className="app">
      <Auth />
      <Movie />
    </div>
  );
}

export default App;
