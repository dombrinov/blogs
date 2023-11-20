import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { PostList } from "../components/PostList";
import { PostForm } from "../components/ui/PostForm/PostForm";
import { PostFilter } from "../components/PostFilter";
import { MyModal } from "../components/ui/MyModal/MyModal";
import { MyButton } from "../components/ui/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import { Loader } from "../components/ui/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { Pagination } from "../components/ui/Pagination/Pagination";
import { Navbar } from "../components/ui/Navbar/Navbar";

function Posts() {
  const [posts, setPosts] = useState([]); // тут хранятся все посты
  const [filter, setFilter] = useState({ sort: "", query: "" }); //поиск и селект
  const [modal, setModal] = useState(false); //модальное окно с созданием постов
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10); // лимит постов в запросе
  const [page, setPage] = useState(1); // номер текущей страницы

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query); // свой кастомный хук, лежит в папке hooks, сортирует и ищет по поисковой строке

  const [fetchPosts, isPostsLoading, postErrors] = useFetching(
    async (limit, page) => {
      const response = await PostService.getALL(limit, page);
      setPosts(response.data);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  ); //useFetching возвращает функцию, состояние загрузки и ошибку. в этом хуке происходит запрос на сервер через класс PostService => getAll => axios.get, полученный массив с лимитом постов уходит в состояние posts,

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]); // здесь происходит вызов функции запроса на сервер один раз для отрисовки массива, добавлена зависимость, чтобы отслеживать лимит постов (запрос делается по лимиту)

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }; // функция создания поста вызывается в дочернем компоненте и передается через пропс в компонент PostForm

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id)); // т.к. в Posts лежит массив с постами, то фильтруем его так: в функцию пришел post, а т.к. функция срабатывает на событии в кнопке удалить конкретного поста, то так мы получаем его id и сравниваем с id всех постов в состоянии posts, если в каждом обьекте id не равен тому id из события, то это true и отрисовывается в приложении, а тот что равен это false, он отрисовываться не будет
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  }; //по клику происходит смена стилей(чтобы подсветить текущую страницу)

  //инлайн стили использованы только чтобы показать, что так тоже можно
  return (
    <div className="App">
      <Navbar />
      <MyButton onClick={() => setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postErrors && <h1>Произошла ошибка ${postErrors}</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop5: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Список постов"}
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
