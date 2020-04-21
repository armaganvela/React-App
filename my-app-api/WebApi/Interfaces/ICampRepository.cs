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

        void UpdateCamp(Camp camp);

        Camp GetCamp(int id);

        void DeleteCamp(Camp camp);

        PagingModel<Camp> FetchCamps(int pageNumber, int pageSize, DateTime? eventDate);

        Country AddCountry(Country country);

        void UpdateCountry(Country country);

        Country GetCountry(int id);

        List<Country> GetAllCountries();

        List<Camp> GetAllCampsByEventDate(DateTime eventDate, bool includeTalks = false);

        void AddTalk(Talk talk);

        void UpdateTalk(Talk talk);

        void AddSpeaker(Speaker speaker);

        void UpdateSpeaker(Speaker speaker);

        void DeleteTalk(Talk talk);

        void DeleteSpeaker(Speaker speaker);

        List<Camp> GetAllCampsAsync(bool includeTalks = false);

        Camp GetCampAsync(int campId, bool includeTalks = false);

        PagingModel<Talk> GetTalksByCampAsync(int pageNumber, int pageSize, int? campId, bool includeSpeakers = false);

        Talk GetTalkByIdAsync(int talkId, bool includeSpeakers = false);

        List<Speaker> GetSpeakersByMonikerAsync(string moniker);

        List<Speaker> GetAllSpeakersAsync();

        PagingModel<Speaker> FetchSpeakers(int pageSize, int pageNumber, string firstName);

        Speaker GetSpeaker(int speakerId);

        City AddCity(City city);

        void UpdateCity(City city);

        List<City> GetCitiesByCountries(int countryId);

        City GetCity(int cityId);

        void DeleteCity(City city);

        PagingModel<City> FetchCities(int pageSize, int pageNumber, int? countryId);
    }
}
