using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using WebApi.Interfaces;
using WebApi.Repositories;
//using Autofac;
//using Autofac.Integration.WebApi;
using WebApi.Models;
using Autofac;
using Autofac.Integration.WebApi;

namespace WebApi.Infrastucture
{
    public static class AutofacConfig
    {
        public static void Register()
        {
            var bldr = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;
            bldr.RegisterApiControllers(Assembly.GetExecutingAssembly());
            RegisterServices(bldr);
            bldr.RegisterWebApiFilterProvider(config);
            bldr.RegisterWebApiModelBinderProvider();
            var container = bldr.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void RegisterServices(ContainerBuilder bldr)
        {
            bldr.RegisterType<AppUsersDbContext>()
              .InstancePerRequest();

            bldr.RegisterType<CampRepository>()
              .As<ICampRepository>()
              .InstancePerRequest();
        }
    }
}