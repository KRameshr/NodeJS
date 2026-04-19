function getTodoById(repository, id) {
  const data = repository.findById(id);
  if (data == null) throw Error("No todo with the given id found");
  return data;
}

module.exports = {
  getTodoById,
};
