using BAK_Services.Models;
using Microsoft.EntityFrameworkCore;

namespace BAK_Services.Database
{
    public class ApplicationDbContext : DbContext
    {
        //Map entities to the database
       public DbSet<Error> Errors { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Make username unique using fluent api
         /*   modelBuilder.Entity<User>()
                .HasIndex(x => x.Username)
                .IsUnique();*/
        
            base.OnModelCreating(modelBuilder);
        }
    }
}