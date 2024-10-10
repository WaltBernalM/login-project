import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { useHistory } from "react-router-dom"
import IsPrivate from "../components/IsPrivate"

const Form = () => {
  const { verify, logout } = useContext(AuthContext)
  const history = useHistory()
  const [user, setUser] = useState(null)

  const verifyUser = () => {
    verify()
      .then((res) => {
        if (!res) {
          handleOnSubmit()
          return
        }
        const userData = typeof res === "string" ? JSON.parse(res) : res
        setUser(userData)
      })
      .catch((err) => {
        handleOnSubmit()
      })
  }

  useEffect(() => {
    verifyUser()
  }, [])

  const submitForm = async () => {
    try {
      await logout()
      history.push("/")
    } catch (error) {}
  }

  const handleOnSubmit = (e) => {
    if (!e) {
      return
    }
    e.preventDefault()
    submitForm()
  }

  if (!user) {
    return (
      <IsPrivate>
        <h2>Loading user data...</h2>
      </IsPrivate>
    )
  }

  return (
    <IsPrivate>
      <h2>User Form</h2>
      <div style={inputField}>
        <div style={inputLabel}>ID:</div>
        <input type="text" value={user.id} disabled style={{ border: '3px solid gray' }}/>
      </div>

      <div style={inputField}>
        <div style={inputLabel}>Name:</div>
        <input type="text" value={user.name} disabled style={{ border: '3px solid gray' }} />
      </div>

      <div style={inputField}>
        <div style={inputLabel}>Father Last Name:</div>
        <input type="text" value={user?.fatherLastName ?? ""} disabled style={{ border: '3px solid gray' }} />
      </div>

      <div style={inputField}>
        <div style={inputLabel}>Mother Last Name:</div>
        <input type="text" value={user?.motherLastName ?? ""} disabled style={{ border: '3px solid gray' }} />
      </div>

      <button onClick={handleOnSubmit}>Log out</button>
    </IsPrivate>
  )
}

const inputField = {
  width: "380px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const inputLabel = { width: "100%", textAlign: "right" }

export default Form
