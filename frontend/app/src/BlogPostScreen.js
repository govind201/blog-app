import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled from 'styled-components';

const BlogPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
`;

const Title = styled.h1`
    color: #000000;
    font-size: 36px;
    margin: 26px;
    padding: 20px;
    width: 60%;
`;

const Description = styled.p`
    font-size: 22px;
    margin: 16px;
    color: #767676;
    text-align: justify;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 40px;
    line-height: 48px;
    max-width: 60%;
`;

const Image = styled.img`
    width: 50%;
    max-height: 500px;
    margin: 16px;
`;


const BlogPostScreen = props => {
    const [blog, setBlog] = useState({});
    const  id  = props.match.params.blogId;

    useEffect(() => {
        // console.log("this is id", props.match.params);
        axios
            .get(`http://localhost:5000/blogs/${id}`)
            .then(response => {
                setBlog(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);
    const { title, description } = blog;
    return (
        <BlogPostContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
            {blog.image && <Image src={`data:image/jpeg;base64,${Buffer.from(blog.image.data).toString('base64')}`} alt={title} />}
        </BlogPostContainer>
    );
};

export default BlogPostScreen;
