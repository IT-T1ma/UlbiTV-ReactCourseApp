import React, {useEffect,  useState} from 'react';
import PostService from "./API/PostService";
import {usePosts} from "./hooks/usePosts";
import {useFetching} from "./hooks/useFetching";
import {getPageCount} from "./utils/pages";
import PostForm from "./Component/PostForm";
import MyModal from "./UI/MyModal/MyModal";
import PostFilter from "./Component/PostFilter";
import Pagination from "./pagination/Pagination";
import PostsList from "./Component/PostsList";

import './style.css'

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'Description'},
        {id: 2, title: 'Java', body: 'Description'},
        {id: 3, title: 'Python', body: 'Description'},
        {id: 4, title: 'C++', body: 'Description'}
    ])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    const changePage = (page) => {
        setPage(page)
    }

    useEffect( () => {
        fetchPosts();
    }, [page])

    const sortedAndSearchPost = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(() => setModal(false))
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (

    <div className="App">
        <button className='btnAdd' onClick={() => setModal(true)}>
            Создать пользователя
        </button>
        <MyModal 
            visible={modal} 
            setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <PostFilter 
            filter={filter}
            setFilter={setFilter}/>

        {postError &&
            <h1>Ошибка: ${postError}</h1>

        }
        
        {isPostsLoading 
            ?   <h1>Загрузка постов...</h1>
            :   <PostsList posts={sortedAndSearchPost} remove={removePost} title='Список постов'/>
        }

        <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}/>
    </div>

  )
}

export default App;