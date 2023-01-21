import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const HomeScreenContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; 
  grid-gap: 3rem;
  justify-content: center;
  width: 100%;
`;
const BlogCardContainer = styled.div`
  width: 100%
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  background-color: #f1f1f1;
  margin-top: 50px;
  margin-left: 80px;
  width: 300px;
  height: 180px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px  #ccc;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;


color: #000000;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;


const Title = styled.h2`
  font-size: 22px;
  margin: 16px;
`;
  






const HomeScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const history = useHistory();

    const handleClick = (blogId) => {
        history.push(`/blogs/${blogId}`);
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/blogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <HomeScreenContainer>
            {blogs.map(blog => (
                <BlogCardContainer key={blog._id} onClick={() => handleClick(blog._id)}>
                    <Title>{blog.title}</Title>
                </BlogCardContainer>
            ))}
        </HomeScreenContainer>
    );
};

export default HomeScreen;
