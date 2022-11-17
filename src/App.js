import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { AddButton, TodoItem, Input } from "./components";
import { useState, useEffect } from "react";

export default function App() {
  // const [isCompleted, setIsCompleted] = useState([])
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [currentText, setCurrentText] = useState(""); // 현재 수정 중인 텍스트

  const [mode, setMode] = useState("write"); // 수정일 떄는 'edit'
  const [selectedId, setSelectedId] = useState(null);

  // "2bac031e-f703-48e9-8042-e73e11c7a784"
  // "c578facd-137f-4df1-a00a-d690d67586a1"
  // "60ba4a08-1880-4e7c-8170-95ee5e8cbc12"

  // const [editMode, setEditMode] = useState(false)
  // const [mode, setMode] = useState("write");
  // write
  // edit

  useEffect(() => {
    console.log(currentText);
  }, [currentText]);

  const handleClick = () => {
    if (text.replace(/\s/g, "") === "") {
      return;
    }
    // https://stackoverflow.com/questions/154059/how-do-i-check-for-an-empty-undefined-null-string-in-javascript

    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4()
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // const handleUpdate = (id, mode) => {
  //   // isCompleted를 수정하는 모드

  //   // text만 수정하는 모드

  //   // 항상 새로운 배열을 만들어야 얕복
  //   const updateTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       switch (mode) {
  //         case "completeEdit":
  //           return {
  //             ...todo,
  //             isCompleted: !todo.isCompleted
  //           };
  //         case "textEdit":
  //           return {
  //             ...todo,
  //             text: currentText
  //           };
  //         default:
  //           return null;
  //       }
  //     }

  //     return todo;
  //   });

  const handleChangeCheckbox = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
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
          text: currentText
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
    <div className="App">
      {todos.map((todo) => {
        const { text, isCompleted, id } = todo;
        return (
          <TodoItem
            key={id}
            text={text}
            isCompleted={isCompleted}
            id={id}
            handleChangeCheckbox={handleChangeCheckbox}
            handleEditTitle={handleEditTitle}
            handleDelete={handleDelete}
            currentText={currentText}
            setCurrentText={setCurrentText}
            mode={mode}
            setMode={setMode}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input setText={setText} text={text} />
        <AddButton handleClick={handleClick} />
      </form>
    </div>
  );
}
//
// 투두리스트
// 체크박스 (완료 여부 확인)
// 인풋
// 버튼
// 인풋창에 글 적고, 추가버튼 누리면 투두 추가됨

// 삭제는 좀있다

// 투두 데이터는 어떤 모양으로?
// 이벤트 버블링
// {
//  text: 투두 이름
//  isCompleted
//  id:
// }

// {
//  text: "공부하기",
//  isCompleted : false,
//  id: 00
// }

// 수정하기
// Input에 글 적고, 추가 버튼을 눌러야만 추가가 되는데, 요거 Enter
// select 박스로 카테고리 선택하기

// 이벤트 핸들러 작명하기
//   성욱님
// handleCheckboxCheck
// handleCheckboxClick
// 민지님
// change - update - check
// handleChangeCheckbox
// handleEditTitle
// handle-동작-대상
// handleUpdate
// isComplete - checkbox(Cb)
// 힘찬님 handleUpdateCompleteCb
// handleUpdateTodoTitle
