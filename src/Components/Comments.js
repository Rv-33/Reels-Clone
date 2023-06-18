import React from 'react'
import { useState, useEffect } from 'react';
import { database } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
function Comments({ postData }) {
    const [comments, setComments] = useState(null);
    // console.log(postData);
    // console.log(4);
    useEffect(() => {
        console.log('useeffect called')
        const fetchComments = async () => {
          let arr = [];
           console.log(postData.comments.length);
          for (let i = 0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get();
            console.log(data.data())
            arr.push(data.data());
          }
          setComments(arr);
      }
      fetchComments();
      // console.log(comments.length);
      // console.log(comments);
        
      }, [postData]);
      
  return (
      <div>
          {
                comments==null? <CircularProgress/> :
                <>
                {
                    comments.map((comment,index)=>(
                        <div style={{display:'flex'}}>
                        <Avatar  src={comment.uProfileImage}/>
                            <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                         </div>
                    ))
                }
                </>
            }
    </div>
  )
}

export default Comments
