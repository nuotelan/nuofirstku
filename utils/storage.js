export const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('LocalStorage set error:', error)
        }
    },

    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : defaultValue
        } catch (error) {
            console.error('LocalStorage get error:', error)
            return defaultValue
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error('LocalStorage remove error:', error)
        }
    },

    clear() {
        try {
            localStorage.clear()
        } catch (error) {
            console.error('LocalStorage clear error:', error)
        }
    }
}