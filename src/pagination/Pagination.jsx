import { getPagesArray } from "../utils/pages"

const Pagination = ({totalPages, page, changePage}) => {
    let PagesArray = getPagesArray(totalPages)
    return(
        <div>
            {PagesArray.map(p => {
            return(
                <button
                    onClick={() => changePage(p)}
                    key={p} 
                    className={page === p ? 'page_btn-current': 'page_btn'}>
                    {p}
                </button>
                )
            })}
        </div>
    )
}

export default Pagination;