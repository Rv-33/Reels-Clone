import React from 'react'
import { useState, useEffect } from 'react';
import { database } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import Avatar from '@mui/material/Avatar';
import './Posts.css'
import Like from './Like';
import { Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';
function Posts({ userData }) {
    // console.log('posts');
    // console.log(userData.fullname);
    const [posts, setPosts] = useState(null);
    // open stores the post Id on which the dialog box must open
    const [open, setOpen] = React.useState(null);

            const handleClickOpen = (id) => {
                setOpen(id);
            };

            const handleClose = () => {
                setOpen(null);
    };
    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0];
            console.log(ele);
            //Play all the videos and stop only when it is niot paused already and not intersecting int 60%THRESHOLD
            ele.play().then(() => {
                if (!ele.isPaused && !entry.isIntersecting) {
                    ele.pause();
                } 
            })  
        })  
        //We have two methods
        //1.We can pause all the videos and play those videos which intersect
        //2.We can play all those videos and play those which doesn;t intersect
        //SInce HTMLMediaElement.play is asynchronous function if we play at the time of inteserction
        //we may get log because that is asuynchrnous
        //so we chose secnod method
    }
    //when posts execyte this api
    let observer = new IntersectionObserver(callback, { threshold: 0.6 });
    useEffect(() => {
        const elements = document.querySelectorAll('.videos');
        elements.forEach((element)=>{
           observer.observe(element)
        })
        //when post change we remove the old observer and new oberserv will be oberserved again
        return () => {
            observer.disconnect();
        }
    },[posts])
    useEffect(() => {
        let parr = []
        /**on snapshot is used to update the posts likes and comments whenerve the post is being liked. */
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr=[]
            // since querysnapshot is a collection we iterate for each doc
            querySnapshot.forEach((doc) => {
                //we are pushing the current doc data and postId which is id given to doc
                //it is different from pid attribute in the given data.
                let data = { ...doc.data(), postId:doc.id }
                parr.push(data);
            })
            setPosts(parr);
            console.log(parr);
        })
        return unsub;
    }, [])
  return (
      <div>
          {
              posts == null || userData == null ? <CircularProgress /> :
                  <div className="video-container">
                      {
                          posts.map((post,index)=>(
                            <React.Fragment key={index}>
                                <div className="videos">
                                      <Video src={post.pUrl}></Video>
                                      <div className="fa" style={{ display: 'flex' }}> 
                                          {/* <h4>Hlo</h4> */}
                                          {console.log(post.uProfile)}
                                          <Avatar src={post.uProfile} />
                                          <h4>{post.uName}</h4>
                                      </div>
                                      <Like userData={userData} postData={post}></Like>
                                      <ChatIcon className="chat-styling" onClick={()=>handleClickOpen(post.pId)} />
                                      {/* The problem wuth the dialog box is that for every post it is checking the open and the dialog box
                                      is opening as per the window.if we style dialog box for the current post then we can see another
                                      dialog box opened at the last.Inorder to remove that we need to checl postId attribute to openId */}
                                      <Dialog
                                        //   only opens when curpost id equal to open Id
                                          open={open == post.pId}
                                          onClose={handleClose}
                                          aria-labelledby="alert-dialog-title"
                                          aria-describedby="alert-dialog-description"
                                          fullWidth={true}
                                          maxWidth={'md'}
                                            >
                                          <div className="modal-container">
                                              <div className="video-modal">
                                                  <video autoPlay={true} muted={"muted"} controls>
                                                      <source src={post.pUrl}/>
                                                 </video>
                                              </div>
                                              <div className="comment-modal">
                                                     <Card className='card1' style={{padding:'1rem'}}>
                                                        <Comments postData={post}></Comments>    
                                                  </Card>
                                                <Card variant='outlined' className='card2'>
                                                      {/* <Typography>{post.likes.length == 0 ? '' : `Liked By ${posts.likes.length} users`}</Typography> */}
                                                      <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                      <div style={{display:'flex'}}>
                                                          <Like2 userData={userData} postData={post} style={{display:'flex' ,alignItems:'center',justifyContent:'center'}}></Like2>
                                                          <AddComment userData={userData} postData={post} />
                                                      </div>
                                                </Card>
                                              </div>
                                           </div>
                                    </Dialog>
                                </div>
                            </React.Fragment>
                          ))
                      }
                      
                </div>
          }
      
    </div>
  )
}

export default Posts
