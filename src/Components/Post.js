import './../Css/Post.css'
import Avatar from "@material-ui/core/Avatar";
import { useEffect, useState } from 'react';
import { getDoc, getFirestore,doc } from 'firebase/firestore';

function Post({username, caption, imageUrl,postID}) {
    const [comments,setComments] = useState([]);
    const db = getFirestore();
    useEffect(()=>{
      if(postID) {
        const docRef = doc(db,'posts',postID);
        getDoc(docRef).then((doc)=>{
          console.log(doc);
        })
      }
    })
  
  return (
    <div className='post'>
        <div className="post__header">

        
            <Avatar
                className="post__avatar"
                alt={username}
                src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
        </div>
      {/*header->avatar + username*/}

        <img 
            className='post__image' 
            src={imageUrl} alt=""/>
      {/*image */}
      <h4 className='post__text'><strong>{username} </strong>{caption}</h4>
      {/*username + caption */}

    </div>
  )
}

export default Post
