export function constructUser(username, email, password, path) {
    const user = {
        username: username,
        email: email,
        password: password,
        path: path
    }
    return user
}