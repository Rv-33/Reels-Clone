import React from 'react'
import { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import { LinearProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../Context/Authcontext";
import { useContext } from "react";
import { AuthProvider, signup } from "../Context/Authcontext";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
function UploadFile(props) {
    // console.log(props);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // const [file, setFile] = useState('');
    const { user } = useContext(AuthContext)
    const history = useNavigate();
    const handleChange = async (file) => {
        // console.log(file)
        if (file == null) {
            setError('Please select a file!');
            setTimeout(() => {
                setError('');
            }, 2000)
            return;
        }
        // console.log(1);
        // console.log(2);
        if (file.size / (1024 * 1024) > 100) {
            setError('File size is greater than 100mb');
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }
        
        
        let uid = uuidv4();
        setLoading(true);
        console.log(2);
        const storageRef = ref(storage, `posts/${uid}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        let createUserInDB = async (url) => {
            // let res = await database.users.add({name,age})
            // console.log(4);
            let obj = {
                likes: [],
                comments: [],
                pId: uid,
                pUrl: url,
                uName: props.user.fullname,
                uProfile: props.user.profileUrl,
                userId: props.user.userId,
                createdAt: database.getTimeStamp()
            
            }
            // console.log(obj);
            database.posts.add(obj).then(async (ref) => {
                console.log(ref);
                let res = await database.users.doc(props.user.userId).update({
                    postIds: props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                }).then(() => {
                    setLoading(false);
                })
            }).catch((err) => {
                setError(err);
                setTimeout(() => {
                    setError('');
                }, 2000)
                setLoading(false);

            })
      
        }
        function fn1(snapshot) {
            console.log(snapshot);
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} done.`)
        }
        function fn2(error) {
            // console.log(error);
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false)
            return;
        }
        function fn3() {
            setLoading(false);
            console.log(3)
              getDownloadURL(ref(storage, `posts/${uid}/${file.name}`))
              .then((url) => {
                console.log(url);
                  createUserInDB(url);
                })
        
        }
    }
        return (
            <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
                {
                    error != '' ? <Alert severity="error">{error}</Alert> :
                        <>
                            {/* since both the input and label are connected with the same id */}
                            {/* By wrapping the Button component inside the label element, you have made the label element the clickable area for the file input field.
                       When the Button component is rendered as a <button> element instead of a <span> element, it is no longer 
                       a child of the label element, and clicking on it will not activate the file input field. */}
                            <input type="file" accept='video/*' id="upload-input" style={{ display: "none" }} onChange={(e) => handleChange(e.target.files[0])} />
                            <label htmlFor="upload-input">
                                <Button variant='outlined' color='secondary' disabled={loading} component="span">
                                    <MovieIcon />&nbsp;Upload Video
                                </Button>
                            </label>
                            {/* <Button variant='outlined' color='secondary' disabled={loading} onClick={handleChange}>Upload</Button> */}
                            {loading && <LinearProgress color="secondary" style={{ marginTop: '3%' }} />}
                        </>
                  
                }
            </div>
        )
    }

export default UploadFile;
