import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { Loader } from "../components/ui/Loader/Loader";
import { Comments } from "../components/Comments";

export const PostIdPage = () => {
  const params = useParams(); //хук для получения id маршруте запроса
  const [post, setPost] = useState({}); //обьект в котором лежат данные поста
  const [comments, setComments] = useState([]); //массив! в котором лежат объекты с данными комментариев

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  }); // запрос данных поста

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPost(id);
    setComments(response.data);
  }); // запрос данных о комментах

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []); // вызов функций, осуществляющих запрос, для первого рендера

  return (
    <div>
      <h1>Страница поста c id= {params.id}</h1>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <h3>
              {post.id}.{post.title}
            </h3>
            <p>{post.body}</p>
          </div>
        )}
      </div>
      <h2>Комментарии</h2>
      <div>
        {isComLoading ? (
          <Loader />
        ) : (
          <div>
            {comments.map((comm) => {
              return <Comments email={comm.email} body={comm.body} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
