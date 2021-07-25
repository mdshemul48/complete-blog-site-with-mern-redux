import { Link } from 'react-router-dom'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
const Pagination = ({ count, page, parPage }) => {

    let totalPages = Math.ceil(count / parPage)
    let startLoop = page;
    let diff = totalPages - page
    if (diff <= 3) {
        startLoop = totalPages - 3
    }
    let endLoop = startLoop + 3
    if (startLoop <= 0) {
        startLoop = 1
    }
    const links = () => {
        const store = []
        for (let i = startLoop; i <= endLoop; i++) {
            store.push(<li key={i}><Link to={`/dashboard/${i}`}>{i}</Link></li>)
        }
        return store
    }
    const next = () => {
        if (page < totalPages) {
            return (<li><Link to={`/dashboard/${+page + 1}`}><BsChevronDoubleRight /></Link></li>)
        }
    }
    const prev = () => {
        if (page > 1) {
            return (<li><Link to={`/dashboard/${+page - 1}`}><BsChevronDoubleLeft /></Link></li>)
        }
    }
    return (
        <div className="pagination">
            {prev()}{links()}{next()}
        </div>
    )
}

export default Pagination
