import React,{useState,useEffect} from 'react';
import './style.css';
import Nav from '../Navbar/nav';
import blogPost from '../../data/blog.json';
import {NavLink} from 'react-router-dom';

const Main=(props)=>{

 const[posts,setPosts]=useState([]);

  useEffect(()=>{
    const posts = blogPost.data;
    setPosts(posts);
  });

  return (
    <div className="row">
    <Nav />
    <main>
    <div className="flexbox-container">
    {
      posts.map(post=>{
        return(
                <div className="firstblock">
                  <img className="imageicon" src={require(`../../Images/${post.SmoothiesImage}`)} alt="Nature" align="center" />
                    <NavLink key={post.id} to={`/post/${post.id}`}>
                      <h1 className="posttitle">{post.SmoothiesTitle}</h1>
                    </NavLink>
                    <span className="postedby">{post.SmoothiesName}</span>
                </div>
              );
      })
    }
    </div>
    </main>

    </div>
      );
}

export default Main;
