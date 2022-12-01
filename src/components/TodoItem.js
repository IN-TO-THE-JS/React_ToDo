import { useContext } from "react";
import { TodoContext } from "../context/ToDoContext";

const TodoItem = ({ text, isCompleted, id }) => {
  const {
    handleDelete,
    handleChangeCheckbox,
    handleEditTitle,
    currentText,
    setCurrentText,
    mode,
    setMode,
    selectedId,
    setSelectedId,
  } = useContext(TodoContext);

  return (
    <div style={{ display: "flex" }}>
      <input
        type='checkbox'
        // defaultChecked={false}
        defaultChecked={isCompleted}
        id={id}
        name={id}
        onClick={(e) => {
          handleChangeCheckbox(id);
        }}
      />
      {mode === "edit" && selectedId === id ? ( // edit -> text만 edit 하는 것임
        <input
          defaultValue={currentText}
          onChange={(e) => {
            setCurrentText(e.target.value);
          }}
        /> // change하는 이벤트가 들어가야할 듯?
      ) : (
        <label htmlFor={id} style={{ backgroundColor: "blue" }}>
          {text}
        </label>
      )}
      <div style={{ marginLeft: "10px" }}>
        <button
          onClick={() => {
            handleDelete(id);
          }}
          style={{ border: "none" }}>
          삭제
        </button>
        {mode === "edit" && selectedId === id ? (
          <button
            onClick={() => {
              handleEditTitle(id);
              setMode("write");
              setSelectedId(null);
            }}
            style={{ border: "none" }}>
            확인
          </button>
        ) : (
          <button
            onClick={() => {
              setMode("edit");
              setCurrentText(text);
              setSelectedId(id);
            }}
            style={{ border: "none" }}>
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
// {/* <input type="checkbox" value={true} />

// map <key= {} />

// {
//  text: 투두 이름
//  isCompleted
//  id:
// }
