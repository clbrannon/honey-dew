import React from "react"
import { NavBar } from "./nav.js"
import { RegisterForm } from "./register.js"
import { TaskForm } from "./taskForm.js"

export const HoneyDew = () => {

    return (
        <>     
            <NavBar />
          {/* <RegisterForm />  */}
         <TaskForm />
        </>
    )
 }