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

        public Country Country { get; set; }

        public int? CountryId { get; set; }
    }

    public class DeleteCampBindingModel
    {
        public int CampId { get; set; }
    }

    public class CampPagingModel
    {
        public int TotalCount { get; set; }

        public List<CampBindingModel> Items { get; set; }
    }
}