using SummerSchool.DataAccess.Repository;
using SummerSchool.Entity.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SummerSchool.App.Handler
{
    public class GenreHandler
    {
        private readonly IGenreRepository _genreRepository;

        public GenreHandler(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        public List<Genre> GetGenres()
        {
            return _genreRepository.GetAll();
        }

        public Genre? GetGenre(int id)
        {
            return _genreRepository.GetById(id);
        }

        public bool AddGenre(Genre genre)
        {
            if (IsValid(genre))
            {
                var existingGenre = _genreRepository.GetByName(genre.Name);

                if (existingGenre == null)
                {
                    _genreRepository.Add(genre);
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

        public bool UpdateGenre(Genre genre)
        {
            if (IsValid(genre))
            {
                var existingBook = _genreRepository.GetByName(genre.Name);

                if (existingBook != null)
                {
                    _genreRepository.Update(genre);
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

        public bool DeleteGenre(int id)
        {
            var existingBook = _genreRepository.GetById(id);

            if (existingBook != null)
            {
                _genreRepository.Delete(id);
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool IsValid(Genre genre)
        {
            if (string.IsNullOrEmpty(genre.Name))
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
