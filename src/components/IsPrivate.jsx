import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { Redirect } from "react-router-dom"

function IsPrivate(props) {
  const { verify } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(true)

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

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return !loggedIn && !loading ? <Redirect to="/" /> : props.children

  // if (!loggedIn && !loading) {
  //   return <Redirect to="/" />
  // }
  // return props.children
}

export default IsPrivate
