import React, { useMemo, useState } from "react";
import "./styles/App.css";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/ui/PostForm/PostForm";
import { PostFilter } from "./components/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JS1", body: "Description1" },
    { id: 2, title: "python2", body: "backend2" },
    { id: 3, title: "react3", body: "frontend3" },
  ]); // тут хранятся все посты

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const sortedPost = useMemo(() => {
    if (filter.sort) {
      return [
        ...posts.sort((a, b) => a[filter.sort].localeCompare(b[filter.sort])),
      ];
    } //мутируем не само состояние(этого делать нельзя!), а спредом создаем копию и сортируем копию
    //осуществляется сортировка в алфавитном порядке названия постов сравниваются друг с другом и выстраиваются в алфавитном порядке, тоже самое с описанием, за то отвечает localeCompare
    return posts;
  }, [filter.sort, posts]); //эта функция проверяет есть ли в состоянии что-то, и, если есть, то сортируем массив постов и возвращаем его, если нет, то возвращаем обычный массив постов
  // useMemo чтобы рендерился массив постов при изменении либо селекта либо массива постов, но только один раз

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPost.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [filter.query, sortedPost]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }; // функция создания поста вызывается в дочернем компоненте и передается через пропс в компонент PostForm

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id)); // т.к. в Posts лежит массив с постами, то фильтруем его так: в функцию пришел post, а т.к. функция срабатывает на событии в кнопке удалить конкретного поста, то так мы получаем его id и сравниваем с id всех постов в состоянии posts, если в каждом обьекте id не равен тому id из события, то это true и отрисовывается в приложении, а тот что равен это false, он отрисовываться не будет
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"List 1"}
      />
    </div>
  );
}

export default App;
