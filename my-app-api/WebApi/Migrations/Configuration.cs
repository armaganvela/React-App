namespace WebApi.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
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

            CampRepository campRepository = new CampRepository(context);
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2020", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2019", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2018", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2017", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2016", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2015", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2014", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2013", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2012", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2011", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2010", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2009", Name = "ATLANTA CAMPING" });
            campRepository.AddCamp(new Camp() { EventDate = DateTime.Now, Moniker = "ATL2008", Name = "ATLANTA CAMPING" });
        }
    }
}
