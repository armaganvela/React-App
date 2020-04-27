using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebApi.BindingModels
{
    public class CampBindingModel
    {
        public int CampId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Moniker is required")]
        public string Moniker { get; set; }

        public DateTime? EventDate { get; set; }

        public CountryBindingModel Country { get; set; }

        public int? CountryId { get; set; }

        public CityBindingModel City { get; set; }

        public int? CityId { get; set; }

        public string Longitude { get; set; }

        public string Latitude { get; set; }
    }

    public class TalkBindingModel
    {
        public int TalkId { get; set; }
        
        public int SpeakerId { get; set; }
        public int CampId { get; set; }
        public SpeakerBindingModel Speaker { get; set; }
        public CampBindingModel Camp { get; set; }

        public string Title { get; set; }
        public string Abstract { get; set; }
        public int Level { get; set; }
    }

    public class SpeakerBindingModel
    {
        public int SpeakerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Company { get; set; }
    }

    public class FetchSpeakerBindingModel
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string FirstName { get; set; }
    }

    public class FetchCampsBindingModel
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string MonikerName { get; set; }
    }

    public class FetchCityBindingModel
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public int? CountryId { get; set; }
    }

    public class CountryBindingModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }

    public class DeleteCampBindingModel
    {
        public int CampId { get; set; }
    }

    public class CityBindingModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CountryId { get; set; }

        public CountryBindingModel Country { get; set; }
    }


    public class PagingBindingModel<T> where T :class
    {
        public int TotalCount { get; set; }

        public List<T> Items { get; set; }
    }
}