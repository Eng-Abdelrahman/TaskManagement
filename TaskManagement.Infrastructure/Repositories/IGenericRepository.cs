using System.Linq.Expressions;

namespace TaskManagement.Infrastructure.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task AddAsync(T entity);
        void Delete(T entity);
        Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(long id);
        Task<int> SaveChangesAsync();

    }
}
