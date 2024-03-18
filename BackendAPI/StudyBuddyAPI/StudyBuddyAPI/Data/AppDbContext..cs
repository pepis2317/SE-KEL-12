using Microsoft.EntityFrameworkCore;
using StudyBuddyAPI.Models;

namespace StudyBuddyAPI.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> users { get; set; }
    }
}
