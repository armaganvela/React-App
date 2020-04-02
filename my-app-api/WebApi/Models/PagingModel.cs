using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class PagingModel<T> where T: class
    {
        public int TotalCount { get; set; }

        public List<T> Items { get; set; }
    }
}