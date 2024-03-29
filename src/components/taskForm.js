import { useEffect, useState } from "react"
import { Button, Stack, TextField, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Box, TextareaAutosize } from "@mui/material"
import { useHistory } from "react-router-dom"



export const TaskForm = () => {

    const history = useHistory()
    
    const blankTask = {
        title: "",
        desc: "",
        noEnd: false,
        endDate: "",
        assignSelect: "",
        completed: false
        }

    const [family, setFamily] = useState([])
    const [task, setTask] = useState(blankTask)

    useEffect(
        () => {
            fetch(`http://localhost:8088/members`)
                .then(response => response.json())
                .then((famArray) => {

                    setFamily(famArray)
                })
        },
        []
    )

    const handleChange = e => {

        if (e.target.id === "noEnd") {
            setTask(task => ({...task, [e.target.id]: e.target.checked}))

        }

        else if (e.target.name === "assignSelect") {
            setTask(task => ({...task, [e.target.name]: e.target.value}))
        }

        else {
            setTask(task => ({...task, [e.target.id]: e.target.value}))

        }
    }

    const endDateOption = () => {

        if (!task.noEnd) {

            return <>
        
            <TextField id="endDate" label="End Date" value={task.endDate} variant="standard" onChange={handleChange}/>
            
            </>

        }

        else { 
            return 
        }
    }

    const handleSubmit = e => {
        console.log("Submit")

        return fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
            })

            .then(response => response.json())
            .then(() => {
                setTask(blankTask)
                history.push("/posts")

            })
    }

    return (

    <>

    <Stack       
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        mt={15} 
    >

        <TextField id="title" label="Title" value={task.title} variant="standard" onChange={handleChange}/>
        <TextField id="desc" label="Description" multiline value={task.desc} variant="standard" onChange={handleChange}/>
       
        <FormControlLabel control={<Checkbox id="noEnd" value={task.noEnd} onChange={handleChange}/>} label="No End Date"/>
        {endDateOption()}
        <Box sx={{ minWidth: 120 }} name="D">
            <FormControl fullWidth name="A">
                <InputLabel name="B">Assign To</InputLabel>
                <Select
                    name="assignSelect"
                    label="Assign To"
                    onChange={handleChange}
                >       
                    {
                        family.map(
                            (members) => {
                                return <MenuItem value = {members.fullName} key={members.id} name="menuItem">{members.fullName}</MenuItem>
                            }
                        )
                    }

                </Select>
            </FormControl>
        </Box>
        <Button
           onClick={(clickEvent) => handleSubmit(clickEvent)}
            color="inherit"
        >
            Post
        </Button>
    </Stack>
</>

    )
}
