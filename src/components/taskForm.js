import { useEffect, useState } from "react"
import { Button, Stack, TextField, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormControl, Box } from "@mui/material"



{/* TODO!!!! Add id of poster to object */}


export const TaskForm = () => {

    const [family, setFamily] = useState([])
    const [task, setTask] = useState({

            title: "",
            desc: "",
            repeat: false,
            endDate: "",
            assignSelect: ""

    })



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

        if (e.target.id === "repeat") {
            setTask(task => ({...task, [e.target.id]: e.target.checked}))
        }

        else {
            setTask(task => ({...task, [e.target.id]: e.target.value}))

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

                
                // TODO !!! Bring up "Submit another? text"

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
        <TextField id="desc" label="Description" value={task.desc} variant="standard" onChange={handleChange}/>
        <FormControlLabel control={<Checkbox id="repeat" value={task.repeat} onChange={handleChange}/>} label="Repeat"/>
        <TextField id="endDate" label="End Date" value={task.endDate} variant="standard" onChange={handleChange}/>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="assignLabel">Assign To</InputLabel>
                <Select
                    id="assignSelect"
                    label="Assign To"
                    onChange={handleChange}
                >       
                    {
                        family.map(
                            (members) => {
                                return <MenuItem value={members.fullName}>{members.fullName}</MenuItem>
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
