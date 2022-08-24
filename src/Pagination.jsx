export const Pagination = (props) => {
    const { numPages, onNext, onPrev, currentPage, onLast, onFirst } = props
  
    return (
      <span>
        <button onClick={onFirst}>1</button>
        {currentPage > 1 && <button onClick={onPrev}>prev</button>}
        ...
        {currentPage < numPages && <button onClick={onNext}>next</button>}
        <button onClick={onLast}>{numPages}</button>
      </span>
    )
}
  