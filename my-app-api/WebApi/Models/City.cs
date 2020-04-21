using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class City
    {
        public int CityId { get; set; }

        public string Name { get; set; }
        
        public Country Country { get; set; }
        public int CountryId { get; set; }

        public List<Camp> Camps { get; set; }

        public static City Create(string name, Country country)
        {
            return new City()
            {
                Name = name,
                Country = country,
            };
        }

        public City Update(string name, Country country)
        {
            this.Name = name;
            this.Country = country;
            this.CountryId = country.Id;

            return this;
        }
    }
}