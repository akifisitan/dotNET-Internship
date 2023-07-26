using SummerSchool.App.Database;
using SummerSchool.App.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.App.Handler
{
    public class BookHandler
    {
        private readonly BookRepository _bookRepository;

        public BookHandler(BookRepository bookRepository) 
        {
            _bookRepository = bookRepository;
        }


        public List<Book> GetBooks() 
        {
            return _bookRepository.GetAll(); 
        }

        public Book GetBook(int id) 
        {
            return _bookRepository.GetById(id);
        }

        public bool AddBook(Book book)
        {
            if (IsValid(book))
            {
                var existingBook = _bookRepository.GetByTitle(book.Title);

                if (existingBook == null)
                {
                    _bookRepository.Add(book);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public bool UpdateBook(Book book)
        {
            if (IsValid(book))
            {
                var existingBook = _bookRepository.GetById(book.Id);

                if (existingBook != null)
                {
                    _bookRepository.Update(book);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public bool DeleteBook(int id) 
        {
            var existingBook = _bookRepository.GetById(id);

            if (existingBook != null)
            {
                _bookRepository.Delete(id);
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
