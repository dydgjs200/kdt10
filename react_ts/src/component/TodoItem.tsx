import { TodoItemProp } from "../types/types";

function TodoItem({ id, content, complated }: TodoItemProp) {
  return (
    <li>
      <label>
        <input type="checkbox" defaultChecked={complated} /> {content}
      </label>
    </li>
  );
}

export default TodoItem;
