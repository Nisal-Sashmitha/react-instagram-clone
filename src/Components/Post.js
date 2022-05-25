import './../Css/Post.css'
import Avatar from "@material-ui/core/Avatar";
import { useEffect, useState } from 'react';
import { getFirestore,collection,onSnapshot,addDoc, serverTimestamp ,query,orderBy} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

function Post({username, caption, imageUrl,postID}) {
    const [comments,setComments] = useState([]);
    const [comment, setComment] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;

    
    useEffect(()=>{
      let unsubscribe;
      if(postID) {
        const collectionRef = collection(getFirestore(),"posts",postID,"comments");
        const q = query(collectionRef,orderBy("timestamp","desc"))
        unsubscribe = onSnapshot(q,(snapshot)=>{
            setComments(snapshot.docs.map(doc =>doc.data()
            ))
        console.log(comments);
        
        });
        
      }

      return ()=>{
        unsubscribe();
      };

      
      
    },[postID]);

    const postComment =(event)=>{
      event.preventDefault();
      const collectionRef = collection(getFirestore(),"posts",postID,"comments");
      const docRef = addDoc(collectionRef, {
        text:comment,
        username:user.displayName,
        timestamp:serverTimestamp()
      });
      setComment('');
    }
  
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
      <div className='post__comments'>
        {comments.map((comment)=>(
          <p>
            <strong>{comment.username} </strong>{comment.text}
          </p>
        ))}

      </div>

      {user && (<form className='post__commentBox'>
        <input 
          className='post__input'
          type = "text"
          placeholder='Add a comment...'
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          />
          <button 
            className='post__button'
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >Post</button>
      </form>)}
  
      

    </div>
  )
}

export default Post
