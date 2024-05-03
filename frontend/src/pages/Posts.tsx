import React,{useState, useEffect, useRef, useCallback} from 'react'
import Header from '../components/Header'
import PostCard from '../components/PostCard';
import Loader from '../common/Loader/Loader';
import { useAuthContext } from '../hooks/useAuthContext';

const PAGE_NUMBER = 1;

export default function Posts() {
  const [postData, setPostData] = useState<any>([]);
    const [page, setPage] = useState(PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(12)
    const [loading, setLoading] = useState(true);
    const [notend, setNotEnd] = useState(false);
  

  //Check if Last element is in view
  const observer = useRef<any>()
  const lastPostRef = useCallback((node: any) => {
    if (loading) return
    if (observer.current) {observer.current.disconnect()}
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && notend) {
        // console.log("page: ",page)
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, notend])

    useEffect(() => {
      let ApiCall = true;
      setLoading(true)
      try{
        const fetchdata = async() => {
        const response = await fetch(
          `http://localhost:4000/posts?pageSize=${pageSize}&page=${page}`,{
          credentials: 'include',
          }
        );
        const json =  await response.json()
        if (json.rows?.length){
          if (json.rows.length>0){
          setNotEnd(true)
          }
        }
        
        setPostData((prev:any) => {
          return [...prev, ...json.rows];
        });
        setLoading(false)
        }
        if (ApiCall){
          fetchdata();
        }
      }
      catch(error){
        console.log(error)
      }
      return () => {
        ApiCall = false;
      }
      
    }, [page]);

    
  return (
    <>
    <Header/> 
    <div className="container my-12 mx-auto px-4 md:px-12">
    <div className="flex flex-wrap -mx-1 lg:-mx-4">
       { postData.map((post:any,index:number)=> {
        if (postData.length === index+1){
         return(
          <PostCard
            passref = {lastPostRef}
            key={index}
            photo = {post.photo_image_url} 
            caption = {post.photo_description}
            location = {post.photo_location_name}
            date = {post.photo_submitted_at}
            alt = {post.ai_description}
            username = {post.photographer_username}
        />)
        }
        else{
          return(
            <PostCard
              key={index}
              photo = {post.photo_image_url} 
              caption = {post.photo_description}
              location = {post.photo_location_name}
              date = {post.photo_submitted_at}
              alt = {post.ai_description}
              username = {post.photographer_username}
          />)
        }
       })
       }
    </div>
    </div>
    <div className='flex w-screen align-bottom justify-center items-center'>
      {loading&&<Loader/>}
    </div>
    
    </>
  )
}
