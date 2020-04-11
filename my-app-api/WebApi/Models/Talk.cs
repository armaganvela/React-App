using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Talk
    {
        public int TalkId { get; set; }

        public int CampId { get; set; }
        public Camp Camp { get; set; }

        public int SpeakerId { get; set; }
        public Speaker Speaker { get; set; }

        public string Title { get; set; }
        public string Abstract { get; set; }
        public int Level { get; set; }
    }
}