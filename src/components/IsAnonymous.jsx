import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { Redirect } from "react-router-dom"

function IsAnonymous(props) {
  const { verify } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    verify()
      .then((res) => {
        if (!res) {
          setLoggedIn(false)
          return
        }
        setLoggedIn(true)
      })
      .catch((err) => {
        setLoggedIn(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )

  return loggedIn ? <Redirect to="/form" /> : props.children

  // if (loggedIn) {
  //   return <Redirect to="/form" />
  // }
  // return props.children
}

export default IsAnonymous
