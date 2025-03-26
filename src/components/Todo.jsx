import {
  IoMdCheckmarkCircleOutline,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { TbEdit, TbEditOff } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import "./Todo.css";

function Todo({ todo, currentTodo, onComplete, onUpdate, onDelete }) {
  const stylesTile = {
    wordWrap: "wrap-word",
    textAlign: "justify",
    marginBottom: "10px",
    textDecoration: todo.status == "Completed" ? "line-through" : "",
  };

  const stylesDescription = {
    fontSize: "18px",
    wordWrap: "wrap-word",
    textAlign: "justify",
    textDecoration: todo.status == "Completed" ? "line-through" : "",
  };

  return (
    <>
      <ul className="todo-items">
        <li>
          <h2 style={stylesTile}>{todo.title}</h2>
          <p style={stylesDescription}>{todo.description}</p>
        </li>
        <li>
          {todo.status == "Completed" ? (
            <IoMdCheckmarkCircle
              color={"green"}
              size={"1.5em"}
              className="clickable"
              onClick={() => onComplete(todo)}
            />
          ) : (
            <IoMdCheckmarkCircleOutline
              color={"green"}
              size={"1.5em"}
              className="clickable"
              onClick={() => onComplete(todo)}
            />
          )}
        </li>
        <li>
          {todo._id === currentTodo._id ? (
            <TbEditOff
              color={"blue"}
              size={"1.5em"}
              className="clickable"
              onClick={() => onUpdate(todo)}
            />
          ) : (
            <TbEdit
              color={"blue"}
              size={"1.5em"}
              className="clickable"
              onClick={() => onUpdate(todo)}
            />
          )}
        </li>
        <li>
          <MdDeleteOutline
            color={"red"}
            size={"1.5em"}
            onClick={() => onDelete(todo)}
            className="clickable"
          />
        </li>
      </ul>
    </>
  );
}

export default Todo;
