using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BAK_Services.Database;
using BAK_Services.Exceptions;
using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;

namespace BAK_Services.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _entities;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<T>();
        }

        public async Task<T> GetById(Guid id)
        {
            return await _entities.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _entities.ToListAsync();
        }

        public async Task<IEnumerable<T>> Find(Expression<Func<T, bool>> filterCondition)
        {
            return await _entities.Where(filterCondition).ToListAsync();
        }

        public void Add(T entity)
        {
            var created = _entities.AddAsync(entity);

            if (created.Result.Entity == null)
                throw new EntityNotFoundException(nameof(created));

            _context.SaveChanges();
        }

        public void Remove(T entity)
        {
            var deleted = _entities.Remove(entity);

            if (deleted.Entity == null)
                throw new EntityNotFoundException(nameof(deleted));
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _entities.RemoveRange(entities);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            _entities.AddRangeAsync(entities);
        }
        
        public void ValidateConcurrencyToken(T entity, byte[] concurrencyToken)
        {
            _context.Entry(entity).State = EntityState.Detached;
            entity.ConcurrencyToken = concurrencyToken;
            _context.Attach(entity);
        }
    }
}
