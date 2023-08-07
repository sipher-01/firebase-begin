import { useEffect, useState, useCallback } from "react";
import "./App.css";
import { Auth } from "./component/auth";
import { db } from "./config/firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";


function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isWorth, setIsWorth] = useState(false);
  const [updatedtitle, setupdatedtitle] = useState('')

  const movieCollectionRef = collection(db, "movies");
  useEffect(() => {
    // const  = async () => {
    //   try {
    //     const data = await getDocs(movieCollectionRef);
        
        
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const getMovieList = onSnapshot(movieCollectionRef,(snapshot)=>{
      const filterData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
    })
    return ()=>{
      getMovieList();
    }
  }, []);
  
  const submitMovie = useCallback(async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: movieTitle,
        releaseDate: releaseDate,
        isGood: isWorth,
      });
      // getMovieList()
    } catch (e) {
      console.error(e);
    }
  })

  const newTitle = useCallback((msg) => {
    setMovieTitle(msg.target.value);
  })

  

  const deleteMovie = useCallback(async(id)=>{
    try {
      const movieDoc = doc(db,'movies',id)
      await deleteDoc(movieDoc)
    } catch (e) {
      console.error(e)
    }
  })
  const updateMovie = useCallback(async(id)=>{
    try {
      const movieDoc = doc(db,'movies',id)
      await updateDoc(movieDoc,{title:updatedtitle})
    } catch (e) {
      console.error(e)
    }
  })
  return (
    <div className="app">
      <Auth />
      <div>
        <input placeholder="movie name ..." onChange={newTitle} />
        <input
          placeholder="release date ..."
          type="number"
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isWorth}
          onChange={(e) => setIsWorth(e.target.checked)}
        />
        <label>Is worth</label>
        <button onClick={submitMovie}>submit</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.isGood ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>delete</button>
            <input placeholder="new title.." onChange={e=>setupdatedtitle(e.target.value)}/>
            <button onClick={()=>updateMovie(movie.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
