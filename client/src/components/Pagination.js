import { Link } from "react-router-dom";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
const Pagination = ({ path, count, page, parPage }) => {
  // counting post and deciding total page required
  let totalPages = Math.ceil(count / parPage);
  // this will start the loop counter from the current page
  let startLoop = page;
  // if the total page after removing current page count. if the diff more then 3 then start loop from total page - 3
  let diff = totalPages - page;
  if (diff <= 3) {
    startLoop = totalPages - 3;
  }
  // this will decide only 3 element for the pagination by stopping the end loop counter.
  let endLoop = startLoop + 3;

  // if the start loop lower or equal to 0 then set the start loop to 1
  if (startLoop <= 0) {
    startLoop = 1;
  }
  // this will create all the pagination count element depending on start loop and end loop
  const links = () => {
    const store = [];
    // looping from start loop and ending to endLoop.
    for (let i = startLoop; i <= endLoop; i++) {
      store.push(
        <li key={i} className={i === +page ? "active" : ""}>
          <Link to={`/${path}/${i}`}>{i}</Link>
        </li>
      );
    }
    return store;
  };
  const next = () => {
    // if total page more then current page then add next button else dont show anything
    if (page < totalPages) {
      return (
        <li>
          <Link to={`/${path}/${+page + 1}`}>
            <BsChevronDoubleRight />
          </Link>
        </li>
      );
    }
  };
  const prev = () => {
    // if the page is greater then 1 then add prev button to switch to 1. and if current page 1 then dont show anything.
    if (page > 1) {
      return (
        <li>
          <Link to={`/${path}/${+page - 1}`}>
            <BsChevronDoubleLeft />
          </Link>
        </li>
      );
    }
  };
  return totalPages ? (
    <div className='pagination'>
      {prev()}
      {links()}
      {next()}
    </div>
  ) : (
    ""
  );
};

export default Pagination;
