import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PublishBlogContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 80%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
font-family: 'Inter';
font-style: normal;
font-weight: 300;
font-size: 40px;
line-height: 48px;
text-align: justify;

color: #767676;
`;

const Button = styled.button`
    width: 30%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;



const Image = styled.input`
    width: 50%;
    max-height: 500px;
    margin: 16px;
`;



const PublishBlogScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = event => {
        console.log("image:", event.target.files[0]);
        setImage(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
    
        axios.post('http://localhost:5000/blogs', formData)
            .then(response => {
                console.log(response);
                alert('Blog post published successfully!');
                setTitle('');
                setDescription('');
                setImage(null);
                setImagePreview(null);
            })
            .catch(error => {
                console.log(error);
            });
    };
        return (
            <PublishBlogContainer onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <br/>
                    <Input
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <br/>
                    <TextArea
                        value={description}
                        onChange={event => setDescription(
                            event.target.value)}
                            />
                        </div>
                        <div>
                <label>Image</label>
                    <br/>
                <Image
                    type="file"
                    onChange={handleImageChange}
                />
                {imagePreview && <img src={imagePreview} alt="pic" />}
            </div>
            <br/>
                        <Button type="submit">Publish</Button>
                    </PublishBlogContainer>
        );
};
            
export default PublishBlogScreen;