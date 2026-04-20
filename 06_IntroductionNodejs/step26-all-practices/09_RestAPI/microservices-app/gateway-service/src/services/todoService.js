const axios = require("axios");

const BASE_URL = process.env.TODO_SERVICE_URL;

// CREATE TODO
async function createTodo(data) {
  const response = await axios.post(`${BASE_URL}/todos`, data);
  return response.data;
}

// GET TODOS
async function getTodos() {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data;
}

module.exports = { createTodo, getTodos };
