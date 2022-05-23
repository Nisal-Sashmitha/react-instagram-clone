
import './App.css';
import Post from './Components/Post'
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
        username:"nisal123",
        caption:"wow it worked!",
        imageUrl: 'https://picsum.photos/200'
     },
    {   username:"pavi123",
        caption:"beauty of the nature!",
        imageUrl: 'https://picsum.photos/200'

    },
    {   username:"kasun123",
        caption:"nice!",
        imageUrl: 'https://picsum.photos/200'

    }
]);
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
      
      {
        posts.map(post =>(
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        )

        )
       }

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
