export default function PageNavigation({
  currentPage,
  maxPage,
  prevPageHandler,
  nextPageHandler,
}) {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <div>
        Page: {currentPage} / {maxPage}
      </div>
      <div className='flex w-full space-x-2'>
        <button
          className='flex-auto py-1 bg-gray-200 border rounded-md hover:bg-gray-400 disabled:opacity-50 focus:outline-none focus:ring focus:ring-gray-100'
          disabled={currentPage === 1}
          onClick={prevPageHandler}
        >
          prev
        </button>
        <button
          className='flex-auto py-1 bg-gray-200 border rounded-md hover:bg-gray-400 disabled:opacity-50 focus:outline-none focus:ring focus:ring-gray-100'
          disabled={currentPage === maxPage}
          onClick={nextPageHandler}
        >
          next
        </button>
      </div>
    </div>
  );
}
