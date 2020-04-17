using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Speaker
    {
        public int SpeakerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Company { get; set; }

        public static Speaker Create(string firstName, string lastName, string middleName, string company)
        {
            return new Speaker()
            {
                FirstName = firstName,
                LastName = lastName,
                MiddleName = middleName,
                Company = company
            };
        }

        public Speaker Update(int speakerId, string firstName, string lastName, string middleName, string company)
        {
            SpeakerId = speakerId;
            FirstName = firstName;
            LastName = lastName;
            MiddleName = middleName;
            Company = company;

            return this;
        }
    }
}