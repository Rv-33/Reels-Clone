import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from "../Firebase";
function AddComment({ userData, postData }) {
  const [text, setText] = useState("");
  const handleClick = () => {
    let obj = {
      text: text,
      uProfileImage: userData.profileUrl,
      uName: userData.fullname,
    };
    // console.log(obj);
    // console.log("commented");
    database.comments.add(obj).then((doc) => {
      database.posts.doc(postData.postId).update({
        comments: [...postData.comments, doc.id],
      });
    });
    setText("");
    //   database.comments.doc(obj).set(obj).then(() => {
    //     console.log("Document successfully written!");
    // });
    // let res = database.comments.doc(obj.id).set({
    //              obj: obj
    //         }); ///CREATE COMMAND
    // console.log('comment done');
    // setText('');
    //   database.comments.add(obj)
    // .then((doc) => {
    //   console.log("Comment added with ID: ", doc.id);
    //   database.posts.doc(postData.postId).update({
    //     comments: [...postData.comments, doc.id]
    //   })
    //   .then(() => {
    //     console.log("Post updated successfully");
    //   })
    //   .catch((error) => {
    //     console.error("Error updating post: ", error);
    //   });
    // })
    // .catch((error) => {
    //   console.error("Error adding comment: ", error);
    // });
  };
  return (
    <div style={{ width: "100%" }}>
      <TextField
        id="outlined-basic"
        label="Comment"
        variant="outlined"
        size="small"
        sx={{ width: "70%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Post
      </Button>
    </div>
  );
}

export default AddComment;
