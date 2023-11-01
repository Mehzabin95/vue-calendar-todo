import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref([]);
  const datesWithTasks = ref([]);

  function addTodo(task, date) {
    todos.value.push({ task, date, isChecked: false, isEditing: false });

    if (!datesWithTasks.value.includes(date)) {
      datesWithTasks.value.push(date);
    }
  }

  function getTodosForDate(date) {
    return todos.value.filter((todo) => todo.date === date);
  }

  function removeTodo(index) {
    todos.value.splice(index, 1);
  }

  return { todos, addTodo, getTodosForDate, datesWithTasks, removeTodo };
});
