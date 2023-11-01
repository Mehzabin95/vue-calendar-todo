<template>
  <div class="flex space-x-5" v-bind="$attrs">
    <div class="flex flex-col flex-grow">
      <YearCal @selected="changeYear" />
      <MonthCal @selected="changeMonth" />
      <DateCal
        :selectedValues="selectedValues"
        :selectedDate="selectDateValue"
        :datesWithTasks="datesWithTasks"
        @selected="changeDate"
      />
    </div>
    <div class="w-1/2 font-semibold">
      <div v-if="selectDateValue" class="flex flex-col">
        <span>
          {{
            `${selectDateValue}- ${selectedValues.month + 1}-${
              selectedValues.year
            }`
          }}
        </span>
        <input
          type="text"
          v-model="inputText"
          @keyup.enter="addText(selectDateValue)"
          class="p-2 border border-gray-500 rounded"
        />
        <!-- for showing todos -->
        <ul>
          <li
            v-for="(todo, index) in getTodo(selectDateValue)"
            :key="index"
            class="flex justify-between p-3 bg-gray-700 text-white rounded mt-5"
          >
            <input
              v-model="todo.isChecked"
              type="checkbox"
              class="bg-gray-300 text-gray-700"
            />
            <span
              v-if="!todo.editing"
              :class="{ 'line-through': todo.isChecked }"
              class="cursor-pointer"
              @click="startEditing(todo)"
            >
              {{ todo.task }}
            </span>
            <input
              v-else
              v-model="todo.task"
              @keyup.enter="endEditing(todo)"
              class="text-black"
            />
            <span class="flex gap-3">
              <Icon
                icon="iconamoon:edit-thin"
                class="cursor-pointer"
                @click="startEditing(todo)"
              />
              <Icon
                @click="() => removeTextFromHere(index)"
                icon="jam:trash"
                class="cursor-pointer"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import dayjs from "dayjs";
import { defineAsyncComponent, ref, reactive, computed } from "vue";
import YearCal from "./YearCal.vue";
import MonthCal from "./MonthCal.vue";
import DateCal from "./DateCal.vue";
import { useTodoStore } from "../../store/todo";

const Year = defineAsyncComponent(() => import("./YearCal.vue"));
const Month = defineAsyncComponent(() => import("./MonthCal.vue"));
const Dates = defineAsyncComponent(() => import("./DateCal.vue"));

const selectDateValue = ref(dayjs().date());
const inputText = ref<string>("");
// const isChecked = ref(false);
const todoStore = useTodoStore();

const datesWithTasks = computed(() => todoStore.datesWithTasks);

const selectedValues = reactive({
  month: dayjs().month(),
  year: dayjs().year(),
});

function changeMonth(v) {
  selectDateValue.value = null;
  selectedValues.month = v;
}

function changeYear(v) {
  selectDateValue.value = null;
  selectedValues.year = v;
}

function changeDate(v) {
  selectDateValue.value = v;
}

function addText(selectedDate) {
  const task = inputText.value;
  const date = selectedDate;

  todoStore.addTodo(task, date);
  inputText.value = "";
}

function getTodo(date) {
  const todos = todoStore.getTodosForDate(date);
  return todos;
}

function removeTextFromHere(i) {
  return todoStore.removeTodo(i);
}
function startEditing(todo) {
  todo.editing = true;
}

function endEditing(todo) {
  todo.editing = false;
}
</script>
