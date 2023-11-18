import React from "react";

export const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="" key="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select> // создаем select который принимает пропсы дефолт это первое название видное юзеру, options это массив с названиями, OnChange - берет текст названия и помещает его фильтр массива постов, которые будут отрисовываться по этому названию
  );
};
