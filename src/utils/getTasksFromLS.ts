export const getTasksFromLS = () => {
  const data = localStorage.getItem("tasks");
  let tasks = [];
  if (data !== null && data !== "undefined") {
    console.log(data);
    tasks = JSON.parse(data);
  }

  if (tasks.length > 0) {
    return { tasks };
  } else return { tasks };
};
