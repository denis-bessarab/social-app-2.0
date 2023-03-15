import React, {useEffect, useState} from "react";
import axios from "axios";
import {Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Subscriptions() {

    const [allFollowed, setAllFollowed] = useState([]);

    let axiosConfig;

    if (localStorage.jwt_token === undefined) {
        axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    } else {
        axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.jwt_token,
            }
        }
    }

    useEffect(() => {
        subscriprionsUpdate()
    }, [])

    //SUBSCRIPTIONS UPDATE FUNCTION
    const subscriprionsUpdate = () => {

        if (localStorage.jwt_token !== undefined) {
            let Data = '';
            axios.post('https://akademia108.pl/api/social-app/follows/allfollows',
                Data,
                axiosConfig)
                .then((res) => {
                    setAllFollowed(res.data)
                })
        }
    }


    const unfollow = (userId) => {

        let Data = {
            leader_id: userId
        }

        axios.post('https://akademia108.pl/api/social-app/follows/disfollow',
            Data,
            axiosConfig)
            .then((res) => {
                subscriprionsUpdate()
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            });
    }

    return (
        <Accordion sx={{}} elevation={3} sx={{'&:before': {display: 'none'}}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon color='primary'/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant='h6'>Subscriptions</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        {allFollowed.map(user => {
                            return (
                                <Grid
                                    key={user.id}
                                    p='20px'
                                    display='flex'
                                    flexDirection='row'
                                    flexWrap='wrap'
                                    alignItems='center'
                                >
                                    <Avatar src={user.avatar_url}/>
                                    <Typography mx='20px' variant='h6'>{user.username}</Typography>
                                    <Button sx={{
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        marginLeft: 'auto'
                                    }} variant='outlined' onClick={() => unfollow(user.id)}>Unfollow</Button>
                                </Grid>
                            )
                        })}
                    </Box>
                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}
