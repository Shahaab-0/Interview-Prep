import React,{useEffect} from 'react';
import useFetchData from './useFetchData';
import {  } from 'react';

export default function Posts() {
    const {  post, error, loading, fetchData } = useFetchData();
    useEffect(() => {
        fetchData(`https://jsonplaceholder.typicode.com/posts`);
    },[])
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  

    
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {post.slice(0, 10).map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}