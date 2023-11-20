import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { Loader } from "../components/ui/Loader/Loader";

export const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  useEffect(() => {
    fetchPostById(params.id);
  }, []);
  return (
    <div>
      <h1>Страница поста c id= {params.id}</h1>
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
      <h2>Комментарии</h2>
    </div>
  );
};
