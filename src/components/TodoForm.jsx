import { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import { options } from "../validations/todoForm";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import Button from "../common/Button";
import "./TodoForm.css";

function TodoForm({ onAdd, currentTodo, editOff, disabled }) {
  const user = useContext(UserContext);
  const { register, handleSubmit, formState, reset } = useForm(options);
  const { errors } = formState;

  useEffect(() => {
    if (!editOff) {
      reset(currentTodo);
    } else {
      reset();
    }
  }, [editOff, reset]);

  const submitTask = (data) => {
    onAdd({ ...currentTodo, ...data, userId: user._id });
    reset({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit(submitTask)}>
      <h1 className="create-task">
        Create <span>Task</span>
      </h1>
      <div>
        <Input
          type={"text"}
          register={register("title")}
          autoFocus={true}
          placeholder="Add Title"
        />
        {errors.title && <p className="alert">{errors.title.message}</p>}
        <Input
          type={"text"}
          register={register("description")}
          autoFocus={true}
          placeholder="Add Description"
        />
        {errors.description && (
          <p className="alert">{errors.description.message}</p>
        )}
      </div>
      <Button disabled={disabled}>{editOff ? "Add" : "Update"}</Button>
    </form>
  );
}

export default TodoForm;
