using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Camp
    {
        public int CampId { get; set; }

        public int? CountryId { get; set; }
        public Country Country { get; set; }

        public int? CityId { get; set; }
        public City City { get; set; }

        public int? AttachmentId { get; set; }
        public Attachment Attachment { get; set; }

        public string Name { get; set; }
        public string Moniker { get; set; }

        [Column(TypeName = "Date")]
        public DateTime? EventDate { get; set; }

        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public List<Talk> Talks { get; set; }

        public Camp Update(int campId, string name, string monikerName, DateTime? eventDate, Country country, City city, Attachment attachment, string latitude, string longitude)
        {
            CampId = campId;
            Name = name;
            Moniker = monikerName;
            EventDate = eventDate;
            CountryId = country?.Id;
            Country = country;
            CityId = city?.CityId;
            City = city;
            Attachment = attachment;
            AttachmentId = attachment?.AttachmentId;
            Latitude = latitude;
            Longitude = longitude;

            return this;
        }

        public static Camp NewInstance(string name, string monikerName, DateTime? eventDate, Country country, City city, Attachment attachment, string latitude, string longitude)
        {
            return new Camp()
            {
                Name = name,
                Moniker = monikerName,
                EventDate = eventDate,
                CountryId = country?.Id,
                Country = country,
                City = city,
                CityId = city?.CityId,
                Attachment = attachment,
                AttachmentId = attachment?.AttachmentId,
                Longitude = longitude,
                Latitude = latitude,
            };
        }
    }
}