import React, { useEffect } from 'react'
import { useState } from 'react';
import { database } from '../Firebase';
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
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
import './Profile.css'
function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = React.useState(null);
    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect (()=>{
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        })
    }, [id])
    useEffect( () => {
        const fetchData = async () => {
            if (userData != null) {
                let parr = [];
                for (let i = 0; i < userData.postIds.length; i++){
                  //  console.log(i);
                    let postData = await database.posts.doc(userData.postIds[i]).get();
                    //Here postid is alsp along postData with cause to work like and comments
                    //note that PostId is different from pId in postData
                    parr.push({ ...postData.data(), postId:postData.id });
                }
                setPosts(parr);
            }
        }
        fetchData();
      
    })
  return (
      <>
          {
              posts == null || userData == null ? <CircularProgress /> :
                  <>
                      <Navbar userData={userData}></Navbar>
                      <div className="spacer">
                          
                      </div>
                      <div className="container">
                          <div className="upper-part">
                              <div className="profile-img">
                                  <img src={userData.profileUrl}></img>
                              </div>
                              <div className="info">
                                  <Typography variant='h5'>
                                      Email:{userData.email}

                                  </Typography>
                                  <Typography variant='h6'>
                                      Posts:{userData.postIds.length}
                                  </Typography>
                              </div>
                          </div>
                          <hr style={{marginTop:'3rem',marginBottom:'3rem'}} />
                          <div className="profile-videos">
                    {
                        posts.map((post,index)=>(
                            <React.Fragment key={index}>
                                <div className="videos">
                                    <video muted="muted" onClick={()=>handleClickOpen(post.pId)}>
                                        <source src={post.pUrl}/>
    
                                    </video>
                                    <Dialog
                                        open={open==post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth ={true}
                                        maxWidth = 'md'
                                    >
                                        <div className="modal-container">
                                            <div className="video-modal">
                                                <video autoPlay={true} muted="muted" controls>
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>
                                            <div className="comment-modal">
                                            <Card className="card1" style={{padding:'1rem'}}>
                                                <Comments postData={post}/>
                                            </Card>
                                                <Card variant="outlined" className="card2">
                                                    <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'Liked by nobody':`Liked by ${post.likes.length} users`}</Typography>
                                                    <div style={{display:'flex'}}>
                                                        <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                                        <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userData} postData={post}/>
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
                      </div>
                </>

                  
          
          }
      </>
  )
}

export default Profile
