
const user = {
  id: "1",
  username: "azteca",
  password: "12345",
  name: "John",
  fatherLastName: "Doe",
  motherLastName: "Wick",
}

const mockApiLoginResponse = (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const { password, username } = formData
        const userMatch = user.username === username && user.password === password ? user : null

        if (!userMatch) {
          reject({ success: false, message: "User not found" })
        } else {
          localStorage.setItem('user', JSON.stringify(userMatch))
          resolve({ success: true, data: user })
        }
      } catch (error) {
        reject({ success: false, message: "Server Error" })
      }
    }, 500)
  })
}

const mockApiLogoutResponse = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.removeItem('user')
      if (localStorage.getItem('user')) {
        reject({ success: false, message: 'logout failure' })
      } else {
        resolve({ success: true, data: null })
      }
    }, 500)
  })
}

export const authService = {
  login: (formData) => mockApiLoginResponse(formData),
  logout: () => mockApiLogoutResponse(),
  verify: () => {
    return new Promise((resolve, reject) => {
      const usersaved = localStorage.getItem("user")
      setTimeout(() => {
        if (!usersaved) {
          reject({ success: false, message: "User not logged in" })
        } else {
          resolve({ success: true, data: usersaved })
        }
      }, 500)
    })
  }
}