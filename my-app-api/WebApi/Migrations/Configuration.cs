namespace WebApi.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApi.Models;
    using WebApi.Repositories;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApi.Models.AppUsersDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApi.Models.AppUsersDbContext context)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new AppUsersDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new AppUsersDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "furkanvela",
                Email = "velafurkan@gmail.com",
                EmailConfirmed = true,
                FirstName = "Furkan",
                LastName = "Vela",
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-3)
            };

            manager.Create(user, "P@ssw0rd");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = "SuperAdmin" });
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByName("furkanvela");

            manager.AddToRoles(adminUser.Id, new string[] { "SuperAdmin", "Admin" });
            
            context.Countries.AddOrUpdate(r => r.Name, new List<Country>
            {
                new Country() { Name = "Turkey" },
                new Country() { Name = "England" },
                new Country() { Name = "Germany" },
        }.ToArray());

            context.SaveChanges();

        }
    }
}
