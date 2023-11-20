import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false); // cостояние загрузки постов
  const [error, setError] = useState("");//состояние ошибки

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);//приняли функцию getAll из класса в качестве аргумента и вызываем ее
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};//отрисовка загрузки или ошибки
