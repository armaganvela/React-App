using System;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApi.Infrastucture;

namespace WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AutofacConfig.Register();
        }

        protected void Application_Error(object sender, EventArgs e)
        {
        }
    }
}

