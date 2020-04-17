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
                Country = model.Country?.ToCountryBindingModel(),
            };

            return result;
        }

        public static TalkBindingModel ToTalkBindingModel(this Talk model)
        {
            var result = new TalkBindingModel
            {
                TalkId = model.TalkId,
                Abstract = model.Abstract,
                Level = model.Level,
                Title = model.Title,
                Speaker = model.Speaker?.ToSpeakerBindingModel(),
                Camp = model.Camp?.ToCampBindingModel()
            };

            return result;
        }

        public static CountryBindingModel ToCountryBindingModel(this Country model)
        {
            var result = new CountryBindingModel
            {
                Id = model.Id,
                Name = model.Name,
            };

            return result;
        }

        public static SpeakerBindingModel ToSpeakerBindingModel(this Speaker model)
        {
            var result = new SpeakerBindingModel
            {
               SpeakerId = model.SpeakerId,
               Company = model.Company,
               FirstName = model.FirstName,
               LastName = model.LastName,
               MiddleName = model.MiddleName,
            };

            return result;
        }
    }
}