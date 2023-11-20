import { useMemo } from "react";
//cортировка
export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts.sort((a, b) => a[sort].localeCompare(b[sort]))];
    } //мутируем не само состояние(этого делать нельзя!), а спредом создаем копию и сортируем копию
    //осуществляется сортировка в алфавитном порядке названия постов сравниваются друг с другом и выстраиваются в алфавитном порядке, тоже самое с описанием, за то отвечает localeCompare
    return posts;
  }, [sort, posts]); //в хуке проверка есть ли в состоянии что-то, и, если есть, то сортируем массив постов и возвращаем его, если нет, то возвращаем обычный массив постов
  // useMemo чтобы рендерился массив постов при изменении либо селекта либо массива постов, но только один раз
  return sortedPosts;
};
//поиск
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]); //в хуке поиск без учета регистра
return sortedAndSearchedPosts
};
