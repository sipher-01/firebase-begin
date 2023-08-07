import { auth,googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try{
        await createUserWithEmailAndPassword(auth, email, password);
    }
    catch(error){
        console.error(error)
    }
  };
  const signInWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider);
    }
    catch(error){
        console.error(error)
    }
  };
  const logOut = async () => {
    try{
        await signOut(auth);
    }
    catch(error){
        console.error(error)
    }
  };
  return (
    <div>
      <input
        placeholder="email..." /* `onChange={e=>{setEmail(e.target.value)}}` is an event handler
        that is triggered when the value of the input field changes.
        It updates the `email` state variable with the new value
        entered by the user. */
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="password..."
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={signIn}>submit</button>
      <button onClick={signInWithGoogle}>SignInWithGoogle</button>
      <button onClick={logOut}>SignOut</button>
    </div>
  );
};
