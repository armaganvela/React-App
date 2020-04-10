using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Camp
    {
        public int CampId { get; set; }

        public int? CountryId { get; set; }
        public Country Country { get; set; }

        public string Name { get; set; }
        public string Moniker { get; set; }
        public DateTime? EventDate { get; set; }

        public  Camp Update(int campId, string name, string monikerName, DateTime? eventDate, Country country)
        {
            CampId = campId;
            Name = name;
            Moniker = monikerName;
            EventDate = eventDate;
            CountryId = country?.Id;
            Country = country;

            return this;
        }

        public static Camp NewInstance(string name, string monikerName, DateTime? eventDate, Country country)
        {
            return new Camp()
            {
                Name = name,
                Moniker = monikerName,
                EventDate = eventDate,
                CountryId = country?.Id,
                Country = country,
            };
        }
    }
}