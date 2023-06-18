import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Signup.css";
import insta from "../Assets/Instagram.JPG";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { CloudUpload, ConstructionOutlined } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/Authcontext";
import { useContext } from "react";
import { AuthProvider, signup } from "../Context/Authcontext";
import { doc, setDoc } from "firebase/firestore";
//importing both database and storage for the users
//database stores all thee user data
//storage will store the file or posts uploaded by him
import { database, storage } from "../Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { signup } = useContext(AuthContext);
  const handleClick = async () => {
    if (file == null) {
      setError("Please upload the profile image");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      setError("");
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      console.log(uid);
      const storageRef = ref(storage, `images/${uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", fn1, fn2, fn3);

      let createUserInDB = async (url) => {
        // let res = await database.users.add({name,age})
        let res = await database.users.doc(`${uid}`).set({
          email: email,
          userId: uid,
          fullname: name,
          profileUrl: url,
          createdAt: database.getTimeStamp(),
        }); ///CREATE COMMAND
        console.log(res);
      };
      function fn1(snapshot) {
        console.log(snapshot);
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} done.`);
      }

      function fn2(error) {
        console.log(error);
        setError(error);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
        return;
      }
      function fn3() {
        console.log(3);
        getDownloadURL(ref(storage, `images/${uid}`)).then((url) => {
          console.log(url);
          createUserInDB(url);
          //console.log(database.getTimeStamp());
          // const cityRef = doc(database, 'users', `$uid`);
          // setDoc(cityRef,{email:email},{userId:uid})
        });
        setLoading(false);
        // history("/");
      }
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  //this method will be used for styling the classname from material ui
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card1: {
      height: "6vh",
      marginTop: "0.5%",
    },
  });
  //it will give us the classes styles whenever we have called this
  //in turn we can make use of these classes names for styling
  const classes = useStyles();
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            <Typography
              fontSize="0.87rem"
              variant="subtitle1"
              className={classes.text1}
            >
              Sign up to see photos and videos from your friends
            </Typography>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label={<Typography fontSize="0.9rem">Email</Typography>}
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={<Typography fontSize="0.9rem">Password</Typography>}
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={<Typography fontSize="0.9rem">Full Name</Typography>}
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* margin dense adjusts vertical spacing of the field */}
            {/* component=label will make the the button as label for imput file */}
            <Button
              size="small"
              color="primary"
              fullWidth={true}
              variant="outlined"
              margin="dense"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Upload Profile Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </Button>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              margin="dense"
              onClick={handleClick}
              disabled={loading}
            >
              Sign Up
            </Button>
          </CardActions>
          <CardContent>
            <Typography
              fontSize="0.87rem"
              variant="subtitle1"
              className={classes.text1}
            >
              By Signing Up you agree to our Terms Conditions and Cookie Policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card1}>
          <CardContent>
            <Typography
              fontSize="0.87rem"
              variant="subtitle1"
              className={classes.text1}
            >
              Having an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
