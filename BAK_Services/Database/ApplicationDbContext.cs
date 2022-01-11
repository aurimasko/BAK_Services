using BAK_Services.Models;
using BAK_Services.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BAK_Services.Database
{
    public class ApplicationDbContext : DbContext
    {
        //Map entities to the database
       public DbSet<Error> Errors { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Task> Tasks { get; set; }

        public DbSet<TaskExecution> TaskExecutions { get; set; }
        public DbSet<TaskExecutionTest> TaskExecutionTests { get; set; }
        public DbSet<CourseExecution> CourseExecutions { get; set; }

        public DbSet<User> Users { get; set; }

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