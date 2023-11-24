import React from "react";
import classes from "./Comments.module.css";

export const Comments = ({ email, body }) => {
  return (
    <div className={classes.comment}>
      <h5 className="">{email}</h5>
      <div className="">{body}</div>
    </div>
  );
};
