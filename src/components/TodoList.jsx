import { useEffect, useState, useContext } from "react";
import { getTodos, saveTodo, deleteTodo } from "../services/todoService";
import Todo from "../components/Todo";
import Pagination from "../common/Pagination";
import TodoForm from "./TodoForm";
import { paginate } from "../utils/paginate";
import UserContext from "../contexts/userContext";
import auth from "../services/authService";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import "./TodoList.css";
import Input from "../common/Input";

function TodoList() {
  const user = useContext(UserContext);
  const pageSize = 4;
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [editOff, setEditOff] = useState(true);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data: todos } = await getTodos(user._id);

        setTodos(todos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 400) {
          auth.logoutUser();
          window.location.href = "/";
        }
      }
    };

    getData();
  }, [user._id, setLoading]);

  const handleAdd = async (todo) => {
    try {
      setDisabled((prev) => !prev);
      const { data: newTodo } = await saveTodo(todo);

      if (todo._id) {
        const newTodos = [...todos];
        const index = newTodos.findIndex((t) => t._id == todo._id);
        newTodos[index] = newTodo;
        setTodos(newTodos);
        setCurrentTodo({});
        setEditOff((prev) => !prev);
        toast.success("Task updated successfully!😀");
      } else {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        toast.success("Task added successfully!😀");
      }

      setDisabled((prev) => !prev);
    } catch (error) {
      setDisabled((prev) => !prev);
    }
  };

  const handleUpdate = async (todo) => {
    if (todo.status == "Completed" || !editOff) return;

    setEditOff((prev) => !prev);
    setCurrentTodo(editOff ? todo : {});
  };

  const handleComplete = async (todo) => {
    const originalTodos = todos;

    if (!editOff) return;
    const newTodos = [...originalTodos];
    const index = newTodos.findIndex((td) => td._id === todo._id);
    newTodos[index] = { ...todo };

    if (newTodos[index].status == "Completed") {
      newTodos[index].status = "Pending";
    } else {
      newTodos[index].status = "Completed";
    }

    setTodos(newTodos);

    try {
      await saveTodo(newTodos[index]);
    } catch (error) {
      setTodos(originalTodos);
    }
  };

  const handleDelete = async (todo) => {
    const originalTodos = todos;

    if (!editOff) return;
    const newTodos = originalTodos.filter((td) => td._id !== todo._id);
    setTodos(newTodos);

    try {
      await deleteTodo(todo);
    } catch (error) {
      if (error.response && error.response.status === 404)
        setTodos(originalTodos);
    }
  };

  const handlePrevPage = () => {
    setPrevPage((prev) => prev - 1);
    setNextPage((next) => next - 1);
  };

  const handleNextpage = () => {
    setNextPage((next) => next + 1);
    setPrevPage((prev) => prev + 1);
  };

  const newTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search)
  );
  const items = paginate(newTodos, nextPage, pageSize);

  return (
    <>
      <TodoForm
        onAdd={handleAdd}
        currentTodo={currentTodo}
        editOff={editOff}
        disabled={disabled}
      />
      <div className="todo-list">
        <h1 className="my-tasks">
          My <span>Tasks</span>
        </h1>
        <Input
          labelRequired={false}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <Pagination
          editOff={editOff}
          prevPage={prevPage}
          nextPage={nextPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextpage}
          itemsCount={todos.length}
          pageSize={pageSize}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        items.map((todo) => (
          <Todo
            key={todo._id}
            editOff={editOff}
            todo={todo}
            currentTodo={currentTodo}
            onComplete={handleComplete}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </>
  );
}

export default TodoList;
