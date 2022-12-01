import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// 1. 컨텍스트를 만든다.

// const TodoContext = createContext(초기값);

export const TodoContext = createContext(null);

// 2. 컨텍스트.Provider 프로바이더를 만든다.

// const TodoContextProvider
// child
export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [currentText, setCurrentText] = useState(""); // 현재 수정 중인 텍스트

  const [mode, setMode] = useState("write"); // 수정일 떄는 'edit'
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = () => {
    if (text.replace(/\s/g, "") === "") {
      return;
    }
    // https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript

    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4(),
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };

  const handleChangeCheckbox = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  const handleEditTitle = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: currentText,
        };
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  // 삭제하는 로직
  const handleDelete = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };

  return (
    <>
      <TodoContext.Provider
        value={{
          todos,
          text,
          setText,
          handleClick,
          handleChangeCheckbox,
          handleEditTitle,
          handleDelete,
          currentText,
          setCurrentText,
          mode,
          setMode,
          selectedId,
          setSelectedId,
        }}>
        {children}
      </TodoContext.Provider>
    </>
  );
};
