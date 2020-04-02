using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Camp
    {
        public int CampId { get; set; }
        public string Name { get; set; }
        public string Moniker { get; set; }
        public DateTime EventDate { get; set; }
    }
}