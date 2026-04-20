function createTodo(data) {
  return {
    title: data.title,
    completed: data.completed ?? false,
    createdAt: new Date(),
  };
}

module.exports = { createTodo };
