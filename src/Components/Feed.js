import React from "react";
import { useContext ,useEffect,useState} from "react";
import { AuthContext } from "../Context/Authcontext"
import UploadFile from "./UploadFile";
import { database, storage } from "../Firebase";
import Posts from "./Posts";
import Navbar from "./Navbar";
function Feed() {
  const { logout, user } = useContext(AuthContext);
  // console.log(4);
  // console.log(user.uid);
  const [userData, setUserData] = useState('');
  useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
    })
    return ()=> {unsub()}
},[user])
  return (
    <>
      <Navbar userData={userData} />
    <div style={{display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      {/* <div className="comp" style={{width:"50%"}}>
      <h1>Welocome To Feed</h1>
        <button onClick={logout}>Log Out</button>
      </div> */}
      
      <UploadFile user={userData} />
      <Posts userData={userData}/>
      </div>
      </>
  )
}

export default Feed
