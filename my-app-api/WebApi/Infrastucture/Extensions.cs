using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.BindingModels;
using WebApi.Models;

namespace WebApi.Infrastucture
{
    public static class HtmlExtensions
    {
        public static string GetFirstError(this System.Web.Http.ModelBinding.ModelStateDictionary modelState)
        {
            return modelState.Values.SelectMany(v => v.Errors.Select(b => b.ErrorMessage)).FirstOrDefault();
        }
    }

    public static class Mapper
    {
        public static CampBindingModel ToCampBindingModel(this Camp model)
        {
            var result = new CampBindingModel
            {
                CampId = model.CampId,
                Name = model.Name,
                Moniker = model.Moniker,
                EventDate = model.EventDate,
                CountryId = model.Country?.Id,
                Country = model.Country
            };

            return result;
        }
    }


}