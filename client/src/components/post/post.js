import React,{useState,useEffect} from 'react';
import './style.css';
//import blogPost from '../../data/blog.json';
import Nav from '../Navbar/nav';

const Post=(props)=>{

  const[post,setPost]=useState({
            id:"",
        blogTitle :"",
        postedOn:"",
        author:"",
        blogImage:"",
        blogText:""});
const[postId,setPostId]=useState('');

  useEffect(()=>{
    const postId=props.match.params.postId;
    const post={}; //blogPost.data.find(post=>post.id==postId);
    setPost(post);
    setPostId(postId)
  },[post,props.match.params.postId]);

  if(post.blogImage=="") return null;

    return (
    <div className="rowPost">
    <Nav />
    <main>
    <h1>{post.blogTitle}</h1>
    <h6 id="dateblog">Posed on {post.postedOn} by {post.author}</h6>
    <img className="images" src={require(`../../Images/${post.blogImage}`)} alt="Moutain" />
    <span className="blogText"><br/>{post.blogText}<br/></span>
    <span className="blogText">{post.blogMessage}<br/></span>
    </main>

    </div>
          )

}
export default Post;
