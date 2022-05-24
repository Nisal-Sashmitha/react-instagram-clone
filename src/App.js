import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './App.css';
import Post from './Components/Post';
import { useEffect, useState } from 'react';
import { collection, getDocs ,onSnapshot, getFirestore,getAuth,createUserWithEmailAndPassword} from "./firebase";
import { Input } from '@mui/material';
import { onAuthStateChanged,signOut,updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import ImageUpload from './Components/ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  const [openSignIn,setOpenSignIn]  = useState('');
  const [username,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassowrd] = useState('');
  const [user,setUser] = useState(null);
  const auth = getAuth();
  
  const signUp =(event)=>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    setOpen(false);
    return updateProfile(user,
      {displayName: username}
    )
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
  };

  const signIn = (event)=>{
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setOpenSignIn(false);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

  }

  useEffect(()=>{
    console.log("hi");
    const unsubscribe = onAuthStateChanged(auth,(authUser)=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
        
      }else{
        setUser(null);
      }

    })
    return ()=>{
      unsubscribe();
    }


  },[user,username]);


useEffect(()=>{
  onSnapshot(collection(getFirestore(),"posts"),(snapshot)=>{
    setPosts(snapshot.docs.map(doc =>({
      id: doc.id,
      post:doc.data()
    }) ))
    console.log(posts)
  });

  
},[]);
  return (
    <div className="App">

      {user?.displayName ?(<ImageUpload username={user.displayName}/>):
      (<h3>Sorry you nee to login to upload!</h3>)}
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ ...style, width: 400 }}>
          <center>
            <img 
              className="app__headerImage"
              src="https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg"
              height="40px;"

              alt=""

            /> 
            
        
         </center>
         <form className='app__signup'>

         <center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e)=>setPassowrd(e.target.value)}
            /><br/>
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </center>
         </form>
         

        </Box>
      </Modal>

   {/*-----------------Log in model------------------*/}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={{ ...style, width: 400 }}>
          <center>
            <img 
              className="app__headerImage"
              src="https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg"
              height="40px;"

              alt=""

            /> 
            
        
         </center>
         <form className='app__signup'>

         <center>
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e)=>setPassowrd(e.target.value)}
            /><br/>
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </center>
         </form>
         

        </Box>
      </Modal>

      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
          height="40px;"
          
          alt=""
        />  
      </div>
      {user ? (<Button onClick={() => signOut(auth)}>Log out</Button>):
      (
      <div>
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
      </div>) 
      }
      
      {posts.map(({id,post}) =>(
        <Post key={id} username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}/>
      ))}
      

   
      {/*header*/}
      {/*post*/}
      {/*post */}
    </div>
  );
}

export default App;
