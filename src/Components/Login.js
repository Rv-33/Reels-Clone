import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Login.css";
import insta from "../Assets/Instagram.JPG";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { CloudUpload } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
import bg from "../Assets/insta.png";
import { Navigate,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
//image tag will be used for imgae sliding
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import img5 from "../Assets/img5.jpg";
import { AuthContext } from "../Context/Authcontext";
import { useContext } from "react";
export default function Login() {
  const store = useContext(AuthContext);
  console.log(store);
  //this method will be used for styling the classname from material ui
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card1: {
      height: "7vh",
      marginTop: "1%",
    },
    text2: {
      textAlign: "center",
    },
  });
  //it will give us the classes styles whenever we have called this
  //in turn we can make use of these classes names for styling
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { login } = useContext(AuthContext);
  const handleClick =async()=> {
          try {
              setError('');
            setLoading(true);
            // console.log(2);
            // console.log(email);
            // console.log(password);
            let res = await login(email, password);
            console.log(res);
            setLoading(false);
            history('/');
          } catch(err) {
            setError(err);
            console.log(err);
            setTimeout(() => {
              setError('');
            }, 2000);
            setLoading(false);
          }
  }
  return (
    <div className="loginWrapper">
      <div
        className="imgcar"
        style={{ backgroundImage: "url(" + bg + ")", backgroundSize: "cover" }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={5}
            naturalSlideHeight={423}
            naturalSlideWidth={238}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={img1} />
              </Slide>
              <Slide index={1}>
                <Image src={img2} />
              </Slide>
              <Slide index={3}>
                <Image src={img3} />
              </Slide>
              <Slide index={4}>
                <Image src={img4} />
              </Slide>
              <Slide index={5}>
                <Image src={img5} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            {/* gives error alert when error string is not empty */}
            {error!='' && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
            {/* <TextField
              id="outlined-basic"
              label={ fontSize="0.9rem" value={email} onChange={(e)=>setEmail(e.target.value)}>Email}
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            /> */}
             <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            {/* <TextField
              id="outlined-basic"
              label={<Typography fontSize="0.9rem" value={password} onChange={(e)=>setPassword(e.target.value)}>Password</Typography>}
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            /> */}
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)} />
            {/* margin dense adjusts vertical spacing of the field */}
            {/* component=label will make the the button as label for imput file */}
            <Typography
              className={classes.text2}
              color="primary"
              variant="subtitle1"
            >
              Forgot Password?
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              margin="dense"
            onClick={handleClick} disbaled={loading}>
              Log In
            </Button>
          </CardActions>
          <CardContent></CardContent>
        </Card>
        <Card variant="outlined" className={classes.card1}>
          <CardContent>
            <Typography
              fontSize="0.87rem"
              variant="subtitle1"
              className={classes.text1}
            >
              Don't have an account?{" "}
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
