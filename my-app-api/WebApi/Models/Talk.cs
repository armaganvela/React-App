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

        public static Talk Create(string title, string _abstract, Camp camp, Speaker speaker)
        {
            return new Talk()
            {
                Title = title,
                Abstract = _abstract,
                Camp = camp,
                Speaker = speaker,
                CampId = camp.CampId,
                SpeakerId = speaker.SpeakerId
            };
        }

        public Talk Update(int id, string title, string _abstract, Camp camp, Speaker speaker)
        {
            TalkId = id;
            Title = title;
            Abstract = _abstract;
            Camp = camp;
            Speaker = speaker;
            CampId = camp.CampId;
            SpeakerId = speaker.SpeakerId;

            return this;
        }
    }
}