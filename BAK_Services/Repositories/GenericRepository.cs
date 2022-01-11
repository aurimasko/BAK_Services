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

        public async Task<T> Add(T entity)
        {
            var created = await _entities.AddAsync(entity);

            if (created.Entity == null)
                throw new EntityNotFoundException(nameof(created));

            _context.SaveChanges();

            return created.Entity;
        }
        
        public void RemoveRange(IEnumerable<T> entities)
        {
            _entities.RemoveRange(entities);
            _context.SaveChanges();
        }

        public void AddRange(IEnumerable<T> entities)
        {
            _entities.AddRangeAsync(entities);
            _context.SaveChanges();
        }
        
        public void ValidateConcurrencyToken(T entity, byte[] concurrencyToken)
        {
            _context.Entry(entity).State = EntityState.Detached;
            entity.ConcurrencyToken = concurrencyToken;
            _context.Attach(entity);
        }
    }
}
