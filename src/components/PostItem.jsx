import React from "react";
import { MyButton } from "./ui/button/MyButton";

export const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={(e) => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};
