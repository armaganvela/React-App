using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Country
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public static Country Create(string name)
        {
            return new Country
            {
                Name = name
            };
        }

        public Country Update(string name)
        {
            this.Name = name;

            return this;
        }
    }
}