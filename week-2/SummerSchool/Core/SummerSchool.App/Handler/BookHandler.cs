using SummerSchool.DataAccess.Repository;
using SummerSchool.Entity.Entity;

namespace SummerSchool.App.Handler
{
    public class BookHandler
    {
        private readonly IBookRepository _bookRepository;

        public BookHandler(IBookRepository bookRepository) 
        {
            _bookRepository = bookRepository;
        }


        public async Task<List<Book>> GetBooksAsync() 
        {
            return await _bookRepository.GetAllAsync();
        }

        public async Task<Book?> GetBookAsync(int id) 
        {
            return await _bookRepository.GetByIdAsync(id);
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            if (IsValid(book))
            {
                var existingBook = await _bookRepository.GetByTitleAsync(book.Title);

                if (existingBook == null)
                {
                    var newBook = await _bookRepository.AddAsync(book);
                    return newBook;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<Book> UpdateBookAsync(Book book)
        {
            if (IsValid(book))
            {
                var existingBook = await _bookRepository.GetByIdAsync(book.Id);

                if (existingBook != null)
                {
                    var editBook = await _bookRepository.UpdateAsync(existingBook.UpdateBook(book));
                    return editBook;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteBookAsync(int id) 
        {
            var existingBook = await _bookRepository.GetByIdAsync(id);

            if (existingBook != null)
            {
                await _bookRepository.DeleteAsync(id);
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool IsValid(Book book)
        {
            if (string.IsNullOrEmpty(book.Title))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
