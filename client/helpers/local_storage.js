let credential = {
    addCredential: function (id, body) {
        if (localStorage !== undefined) {
            localStorage.setItem("credential." + id, body);
        }
    },
    removeCredential: function (id) {
        if (localStorage !== undefined) {
            localStorage.removeItem("credential." + id)
        }
    }
}


module.exports = credential;