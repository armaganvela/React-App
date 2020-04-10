using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WebApi.Infrastucture
{
    public class AppExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is BusinessRuleException)
            {
                BusinessRuleException ex = context.Exception as BusinessRuleException;
                throw new HttpResponseException(context.Request.CreateErrorResponse(HttpStatusCode.BadRequest, context.Exception.Message));
            }

            throw new HttpResponseException(context.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, context.Exception.InnerException?.Message ?? context.Exception.Message));
        }
    }

    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.ModelState.IsValid)
            {
                throw new BusinessRuleException(actionContext.ModelState.GetFirstError());
            }
        }
    }
}