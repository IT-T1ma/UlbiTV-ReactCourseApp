
import '../style.css'

const PostItem = (props) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btn">
                <button className='btnAdd' onClick={() => props.remove(props.post)}> 
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default PostItem;