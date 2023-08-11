import { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {ref,uploadBytes} from 'firebase/storage'

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isWorth, setIsWorth] = useState(false);
  const [updatedtitle, setupdatedtitle] = useState("");
  const [fileUpload,setFileUpoad] = useState(null)

  const movieCollectionRef = collection(db, "movies");
  useEffect(() => {
    const movieCollectionRef = collection(db, "movies");
    // const  = async () => {
    //   try {
    //     const data = await getDocs(movieCollectionRef);

    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const getMovieList = onSnapshot(movieCollectionRef, (snapshot) => {
      const filterData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
    });
    return () => {
      getMovieList();
    };
  }, []);

  const submitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: movieTitle,
        releaseDate: releaseDate,
        isGood: isWorth,
        userid: auth?.currentUser?.uid,
      });
      setMovieTitle("");
      setReleaseDate(0);
      setIsWorth(false);

      // getMovieList()
    } catch (e) {
      console.error(e);
    }
  };
const uploadFiles = async()=>{
  if(!fileUpload) return;
  const fileFolderRef = ref(storage,`basics/${fileUpload.name }`)
  try{await uploadBytes (fileFolderRef,fileUpload);}
  catch(e){
    console.error(e);
  }
}
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (e) {
      console.error(e);
    }
  };
  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedtitle });
      setupdatedtitle("");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div>
        <input
          value={movieTitle}
          placeholder="movie name ..."
          onChange={(e) => {
            console.log(movieTitle);
            setMovieTitle(e.target.value);
          }}
        />
        <input
          placeholder="release date ..."
          type="number"
          value={releaseDate}
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <input
          value={isWorth}
          type="checkbox"
          checked={isWorth}
          onChange={(e) => setIsWorth(e.target.checked)}
        />
        <label>Is worth</label>
        <button onClick={submitMovie}>submit</button>
      </div>
      <div>
        {movieList.map((movie, index) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.isGood ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>delete</button>
            <input
              value={updatedtitle[index] || ""}
              placeholder="new title.."
              onChange={(e) => {
                const newTitles = [...updatedtitle];
                newTitles[index]= e.target.value;
                setupdatedtitle(newTitles);
              }}
            />
            <button
              onClick={() => {
                updateMovie(movie.id);
                const newTitles = [...updatedtitle];
                newTitles[index] = ""
                setupdatedtitle(newTitles);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" placeholder="files" onChange={e=>{setFileUpoad(e.target.files)}}/>
        <button onClick={uploadFiles}>upload files</button>
      </div>
    </>
  );
}

export default Movie;
