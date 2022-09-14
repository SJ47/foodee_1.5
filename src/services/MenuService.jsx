// const baseURL = '/api/tasks'

// user below for localhost
// const baseURL = 'http://localhost:5000/api/tasks/'
// const baseURL = 'http://localhost:8080/'

// use below for connecting to backend on Heroku
// const baseURL = "https://my-not-todo-list-backend.herokuapp.com/api/tasks/"

// use below for serverless functions on netlify
const baseURL = "/.netlify/functions/";
// Use below if just reading from a local file
// const baseURL = './tasks.json'

const MenuService = {
    getMenuItems() {
        return fetch(baseURL + "read-all").then((res) => res.json());
    },

    postTask(payload) {
        return fetch(baseURL + "create", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    },

    deleteTask(id) {
        return fetch(baseURL + "delete/" + id, {
            method: "DELETE",
            body: JSON.stringify(id),
            headers: { "Content-Type": "application/json" },
        });
    },

    updateTask(payload) {
        return fetch(baseURL + "update/" + payload._id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }).then((res) => res.json());
    },
};
export default MenuService;
