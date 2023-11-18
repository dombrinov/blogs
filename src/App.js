import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/ui/PostForm/PostForm";
import { PostFilter } from "./components/PostFilter";
import { MyModal } from "./components/ui/MyModal/MyModal";
import { MyButton } from "./components/ui/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import { Loader } from "./components/ui/Loader/Loader";

function App() {
  const [posts, setPosts] = useState([]); // тут хранятся все посты
  const [filter, setFilter] = useState({ sort: "", query: "" }); //поиск и селект
  const [modal, setModal] = useState(false); //модальное окно с созданием постов
  const [isPostsLoading, setisPostsLoading] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query); // свой кастомный хук, лежит в папке hooks, сортирует и ищет по поисковой строке

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setisPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getALL();
      setPosts(posts);
      setisPostsLoading(false);
    }, [1000]);
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }; // функция создания поста вызывается в дочернем компоненте и передается через пропс в компонент PostForm

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id)); // т.к. в Posts лежит массив с постами, то фильтруем его так: в функцию пришел post, а т.к. функция срабатывает на событии в кнопке удалить конкретного поста, то так мы получаем его id и сравниваем с id всех постов в состоянии posts, если в каждом обьекте id не равен тому id из события, то это true и отрисовывается в приложении, а тот что равен это false, он отрисовываться не будет
  };

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading ? (
        <div style={{display: "flex", justifyContent: "center", marginTop5: "50px"}}>
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Список постов"}
        />
      )}
    </div>
  );
}

export default App;
