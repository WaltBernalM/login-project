import React, { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { useHistory } from "react-router-dom"
import IsAnonymous from "../components/IsAnonymous"

const initForm = {
  username: "azteca",
  password: "",
}

function Login() {
  const [formData, setFormData] = useState(initForm)
  const [errorMessage, setErrorMessage] = useState(null)
  const { login, attempts } = useContext(AuthContext)
  const history = useHistory()

  const handleOnChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }))
  }

  const submitForm = async () => {
    try {
      const userInfo = await login(formData)
      if (!userInfo) {
        throw new Error("Invalid username or password")
      }
      history.push("/form")
    } catch (error) {
      setErrorMessage(
        `Invalid username or password, remaining attempts: ${2 - attempts}`
      )
      setFormData(initForm)
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    submitForm()
  }

  const getUsername = () => formData?.username ?? null
  const getPassword = () => formData?.password ?? null

  return (
    <IsAnonymous>
      <h2>Login</h2>
      <input
        type="text"
        placeholder={"Username"}
        value={getUsername()}
        onChange={(e) => handleOnChange("username", e.target.value)}
        disabled={attempts >= 3}
        style={{ border: attempts >= 3 ? '3px solid gray' : '3px solid darkcyan'}}
      />
      <input
        type="password"
        placeholder="*****"
        value={getPassword()}
        onChange={(e) => handleOnChange("password", e.target.value)}
        disabled={attempts >= 3}
        style={{ border: attempts >= 3 ? '3px solid gray' : '3px solid darkcyan'}}
      />
      <button onClick={handleOnSubmit} disabled={attempts >= 3}>
        Send
      </button>

      {errorMessage && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>{errorMessage}</span>
        </div>
      )}
    </IsAnonymous>
  )
}

export default Login
