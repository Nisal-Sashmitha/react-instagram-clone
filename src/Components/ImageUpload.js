import { Input,Button } from '@mui/material'
import React, {useState} from 'react';
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { addDoc, collection, getFirestore,serverTimestamp } from 'firebase/firestore';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const storage = getStorage();
    const db = getFirestore();


    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }

    }

    const hanldeUpload = () =>{
        const spaceRef = ref(storage, `images/${image.name}`);
        const UploadTask = uploadBytesResumable(spaceRef,image);
        UploadTask.on('state_changed',(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
        (error) => {
            console.log(error);
          alert(error.message);
        },
        ()=>{
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                addDoc(collection(db,'posts'),{
                    'timestamp': serverTimestamp(),
                    'caption': caption,
                    'imageUrl':downloadURL,
                    'username':username
                });
                setProgress(0);
              });
        }
        );
        
    }

  return (
    <div>
        
       {/* I want have.... */}
      {/*caption input */}
      {/*file picker */}
      {/*post button */}
      <Input
        placeholder='Enter a caption........'
        type='text'
        value={caption}
        onChange={(e)=>setCaption(e.target.value)}
        />
      <Input
        type='file'
        onChange={handleChange}
        />
     
      <Button onClick={hanldeUpload}>Upload</Button>

    </div>
  )
}

export default ImageUpload
