using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ICampRepository
    {
        List<Camp> GetAllCamps();

        Camp AddCamp(Camp camp);

        Camp UpdateCamp(Camp camp);

        Camp GetCamp(int id);

        void DeleteCamp(Camp camp);

        PagingModel<Camp> FetchCamps(int pageNumber, int pageSize);

        Country AddCountry(Country country);

        Country GetCountry(int id);

        List<Country> GetAllCountries();

        List<Camp> GetAllCampsByEventDate(DateTime eventDate, bool includeTalks = false);

        void AddTalk(Talk talk);

        void AddSpeaker(Speaker speaker);

        void DeleteTalk(Talk talk);

        void DeleteSpeaker(Speaker speaker);

        List<Camp> GetAllCampsAsync(bool includeTalks = false);

        Camp GetCampAsync(string moniker, bool includeTalks = false);

        List<Talk> GetTalksByMonikerAsync(string moniker, bool includeSpeakers = false);

        Talk GetTalkByMonikerAsync(string moniker, int talkId, bool includeSpeakers = false);

        List<Speaker> GetSpeakersByMonikerAsync(string moniker);

        List<Speaker> GetAllSpeakersAsync();

        Speaker GetSpeaker(int speakerId);
    }
}
