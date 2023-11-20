import React from "react";
import { MyButton } from "./ui/button/MyButton";
import { useNavigate } from "react-router-dom";

export const PostItem = (props) => {
  const navigate = useNavigate()

  const goToPost = (id) => {
    navigate(`/${id}`)
  }

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={(e) => goToPost(props.post.id)}>Открыть</MyButton>
        <MyButton onClick={(e) => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};
