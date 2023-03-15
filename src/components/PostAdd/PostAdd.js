import React, {useState} from "react";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {addPostApiCall} from "../../api/api";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import {InputBase} from '@mui/material';

const PostAdd = (props) => {

    const defaultValues = {
        content: "",
    };

    const [formData, setFormData] = useState(defaultValues)

    async function addPost() {
        const response = await addPostApiCall(formData)
        if (response.status === 200) {
            setFormData(defaultValues)
            props.updatePosts()
        } else {
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <Box mb='50px' position='relative'>
            <TextField
                label="Add post"
                multiline
                name='content'
                size='small'
                minRows={4}
                value={formData.content}
                onChange={handleInputChange}
                sx={{
                    width: '100%',
                    position: 'relative',
                }}
                color='primary'
            >

            </TextField>
            <MessageOutlinedIcon
                sx={{
                    width: '50px',
                    height: '50px',
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    cursor: 'pointer',
                    padding: '10px',
                    transform: 'translateY(100%)'
                }}
                onClick={() => addPost()} color='primary'/>
        </Box>
    )
}

export default PostAdd;