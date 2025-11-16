export const validate = {
    email(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    },

    phone(phone) {
        const regex = /^1[3-9]\d{9}$/
        return regex.test(phone)
    },

    studentId(studentId) {
        const regex = /^\d{10,12}$/
        return regex.test(studentId)
    },

    price(price) {
        return price >= 0 && price <= 999999.99
    },

    password(password) {
        return password.length >= 6 && password.length <= 20
    },

    username(username) {
        const regex = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/
        return regex.test(username)
    }
}