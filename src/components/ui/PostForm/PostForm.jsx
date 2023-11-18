import React, { useState } from "react";
import { MyButton } from "../../../components/ui/button/MyButton";
import { MyInput } from "../../../components/ui/input/MyInput";
export const PostForm = ({ create }) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  }); // тут хранится пост,
  const addNewPost = (e) => {
    e.preventDefault(); // отключает обновление формы, т.к. она submit
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: "", body: "" }); // обнуляет инпут после добавления поста
  };// по клику сначала срабатывает addNewPost, в котором лежит вызов функции create, которая наверху добавляет пост к состоянию, где хранятся все посты
  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })} // в инпуте конкретно для одного поста разворачиваем все его ключи, но перезаписываем title в зависимости от того что написано в инпуте
        type="text"
        placeholder="Title"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })} // аналогично названию только с описанием
        type="text"
        placeholder="Description"
      />
      <MyButton onClick={addNewPost}>Create post</MyButton>
    </form>
  );
};
