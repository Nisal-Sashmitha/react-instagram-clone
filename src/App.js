
import './App.css';
import Post from './Components/Post';
import { useEffect, useState } from 'react';
import { collection, getDocs ,onSnapshot, getFirestore} from "./firebase";
function App() {
  const [posts, setPosts] = useState([]);

useEffect(()=>{
  onSnapshot(collection(getFirestore(),"posts"),(snapshot)=>{
    setPosts(snapshot.docs.map(doc => doc.data()))
    console.log(posts)
  });

  
},[]);
  return (
    <div className="App">
      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
          height="40px;"
          
          alt=""
        />  
      </div>
      {posts.map((post) =>(
        <Post username={post.username}
        caption={post.caption}
        imageUrl={post.imageUrl}/>
      ))}
      

      <Post username='nisal123'
          caption="Wow it worked!"
          imageUrl='https://picsum.photos/200'/>
      <Post username='pavi123'
          caption="beauty of the nature!"
          imageUrl='https://picsum.photos/200'/>

      <Post username='kasun 12'
          caption="noice noice!"
          imageUrl='https://picsum.photos/200'/>
      {/*header*/}
      {/*post*/}
      {/*post */}
    </div>
  );
}

export default App;
