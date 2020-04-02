using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace WebApi.Models
{
    public class AppUsersDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppUsersDbContext()
            : base("CnnStr1", throwIfV1Schema: false)
        {
            this.Configuration.LazyLoadingEnabled = true;
        }

        public DbSet<Camp> Camps { get; set; }

        public static AppUsersDbContext Create()
        {
            return new AppUsersDbContext();
        }
    }
}