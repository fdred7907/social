import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Home(){
    const [commentInput,setCommentInput] = useState("");
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/posts")
        .then(res=>setPosts(res.data))
        .catch(err=>console.log(err));
    },[]);

    const handleLike = (id)=>{
        axios.post(`http://localhost:5000/api/posts/like/${id}`)
        .then((res)=>{
            const updatedPosts = posts.map((post)=>{
                return post._id === id ? res.data : post
            });
            setPosts(updatedPosts);
        })
        .catch((err)=>{
            console.log(err);
        });

    }

    const handleComment = (e,id)=>{
        e.preventDefault();
        axios.post(`http://localhost:5000/api/posts/comment/${id}`,{text:commentInput})
        .then((res)=>{
            const updatedPosts = posts.map((post) => {
                return post._id === id ? res.data : post
            });
            setPosts(updatedPosts);
            setCommentInput("");
        })
    }


    return (
        <div className="home">
            <h2>Posts</h2>
            {posts.map((post)=>(
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <div>
                        <p>{post.content}</p>
                        {post.file && (
                            <div>
                                {post.file.includes(".mp4")?(
                                    <video width="320" height="240" controls>
                                        <source src={`http://localhost:5000/uploads/${post.file}`} type="video/mp4"/>
                                    </video>
                                ):(
                                    <img src={`http://localhost:5000/uploads/${post.file}`} alt={post.title}/>
                                )}
                            </div>
                        )}
                        <p className="post-date">Posted on {new Date(post.date).toLocaleDateString()}</p>
                        <p>Likes: {post.likes}</p>
                        <button onClick={()=>handleLike(post._id)}>Like</button>
                        <ul>
                            {posts.comments.map((comment,idx)=>{
                                return (<li key={idx}>{comment.text}</li>)
                            }
                            )}
                        </ul>

                        <input
                            type="text"
                            placeholder="Write something"
                            onChange={((e)=>setCommentInput(e.target.value))
                            }
                            value={commentInput}
                        />
                        <button onClick={(e)=>handleComment(e,post._id)}>Add Comment</button>
                    </div>
                </div>       
            )
            )}
        </div>
    )
}

export default Home;