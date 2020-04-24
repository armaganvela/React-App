using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class CampRepository : ICampRepository
    {
        private readonly AppUsersDbContext _context;

        public CampRepository(AppUsersDbContext context)
        {
            _context = context;
        }

        public List<Camp> GetAllCamps()
        {
            IQueryable<Camp> query = _context.Camps;
            // Order It
            query = query.OrderByDescending(c => c.EventDate);

            return query.ToList();
        }

        public PagingModel<Camp> FetchCamps(int pageNumber, int pageSize, DateTime? eventDate)
        {
            int totalCount = _context.Camps.Count();
            IQueryable<Camp> camps = _context.Camps.Include(camp => camp.Country).Include(camp => camp.City);

            if (eventDate.HasValue)
                camps = camps.Where(x => x.EventDate.Value.Year == eventDate.Value.Year &&
                             x.EventDate.Value.Month == eventDate.Value.Month &&
                             x.EventDate.Value.Day == eventDate.Value.Day);

            return new PagingModel<Camp>
            {
                Items = camps.ToList().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList(),
                TotalCount = camps.Count()
            };
        }

        public Camp AddCamp(Camp camp)
        {
            _context.Camps.Add(camp);
            int campId = _context.SaveChanges();

            return camp;
        }

        public void UpdateCamp(Camp camp)
        {
            _context.Camps.Add(camp);
            _context.Entry(camp).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();
        }

        public Camp GetCamp(int id)
        {
            return _context.Camps.Include(x => x.Country).Include(x => x.City).FirstOrDefault(x => x.CampId == id);
        }

        public bool IsDublicateMonikerName(string monikerName, int? campId = null , bool isUpdate = false)
        {
            if(isUpdate && campId.HasValue)
                return _context.Camps.FirstOrDefault(x => x.Moniker == monikerName && x.CampId != campId ) != null;

            return _context.Camps.FirstOrDefault(x => x.Moniker == monikerName) != null;
        }

        public void DeleteCamp(Camp camp)
        {
            _context.Camps.Remove(camp);

            _context.SaveChanges();
        }

        public Country AddCountry(Country country)
        {
            Country newCountry = _context.Countries.Add(country);
            _context.SaveChanges();

            return newCountry;
        }

        public void UpdateCountry(Country country)
        {
            _context.Countries.Add(country);
            _context.Entry(country).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();
        }

        public City AddCity(City city)
        {
            City newCity = _context.Cities.Add(city);
            _context.SaveChanges();

            return newCity;
        }

        public void UpdateCity(City city)
        {
            _context.Cities.Add(city);
            _context.Entry(city).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();
        }

        public City GetCity(int cityId)
        {
            var city = _context.Cities.Include(x => x.Country).Include(x => x.Camps).FirstOrDefault(x => x.CityId == cityId);

            return city;
        }

        public void DeleteCity(City city)
        {
            _context.Cities.Remove(city);

            _context.SaveChanges();
        }

        public List<City> GetCitiesByCountries(int countryId)
        {
            var cities = _context.Cities.Include(x => x.Country).Where(x => x.CountryId == countryId).ToList();

            return cities;
        }

        public PagingModel<City> FetchCities(int pageSize, int pageNumber, int? countryId)
        {
            var query = _context.Cities.Include(x => x.Country);

            if (countryId.HasValue)
                query = query
                  .Where(x => x.CountryId == countryId.Value);

            return new PagingModel<City>
            {
                Items = query.ToList().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList(),
                TotalCount = query.ToList().Count()
            };
        }

        public List<Country> GetAllCountries()
        {
            IQueryable<Country> query = _context.Countries;
            // Order It
            query = query.OrderByDescending(c => c.Name);

            return query.ToList();
        }

        public Country GetCountry(int id)
        {
            return _context.Countries.FirstOrDefault(x => x.Id == id);
        }

        public void AddTalk(Talk talk)
        {
            _context.Talks.Add(talk);
            _context.SaveChanges();
        }

        public void UpdateTalk(Talk talk)
        {
            _context.Talks.Add(talk);
            _context.Entry(talk).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();
        }

        public void DeleteTalk(Talk talk)
        {
            _context.Talks.Remove(talk);

            _context.SaveChanges();
        }

        public void AddSpeaker(Speaker speaker)
        {
            _context.Speakers.Add(speaker);

            _context.SaveChanges();
        }

        public void UpdateSpeaker(Speaker speaker)
        {
            _context.Speakers.Add(speaker);
            _context.Entry(speaker).State = System.Data.Entity.EntityState.Modified;

            _context.SaveChanges();
        }

        public void DeleteSpeaker(Speaker speaker)
        {
            _context.Speakers.Remove(speaker);

            _context.SaveChanges();
        }

        public List<Camp> GetAllCampsByEventDate(DateTime eventTime, bool includeTalks = false)
        {
            IQueryable<Camp> query = _context.Camps
                .Include(c => c.Country);

            if (includeTalks)
            {
                query = query
                  .Include(c => c.Talks.Select(t => t.Speaker));
            }

            // Order It
            query = query.OrderByDescending(c => c.EventDate);

            return query.ToList();
        }

        public List<Camp> GetAllCampsAsync(bool includeTalks = false)
        {
            IQueryable<Camp> query = _context.Camps
                .Include(c => c.Country);

            if (includeTalks)
            {
                query = query
                  .Include(c => c.Talks.Select(x => x.Speaker));
            }

            // Order It
            query = query.OrderByDescending(c => c.EventDate);

            return query.ToList();
        }

        public Camp GetCampAsync(int campId, bool includeTalks = false)
        {
            IQueryable<Camp> query = _context.Camps
                .Include(c => c.Country);

            if (includeTalks)
            {
                query = query.Include(c => c.Talks.Select(t => t.Speaker));
            }

            // Query It
            query = query.Where(c => c.CampId == campId);

            return query.FirstOrDefault();
        }

        public PagingModel<Talk> GetTalksByCampAsync(int pageNumber, int pageSize, string monikerName, bool includeSpeakers = false)
        {
            IQueryable<Talk> query = _context.Talks.Include(x => x.Camp);

            if (includeSpeakers)
            {
                query = query
                  .Include(t => t.Speaker);
            }

            if (!string.IsNullOrEmpty(monikerName))
                query = query
                  .Where(x => x.Camp.Moniker == monikerName);

            return new PagingModel<Talk>
            {
                Items = query.ToList().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList(),
                TotalCount = query.ToList().Count()
            };
        }

        public Talk GetTalkByIdAsync(int talkId, bool includeSpeakers = false)
        {
            IQueryable<Talk> query = _context.Talks.Include(x => x.Camp);

            if (includeSpeakers)
            {
                query = query
                  .Include(t => t.Speaker);
            }

            // Add Query
            query = query
              .Where(t => t.TalkId == talkId);

            return query.FirstOrDefault();
        }

        public List<Speaker> GetSpeakersByMonikerAsync(string moniker)
        {
            IQueryable<Speaker> query = _context.Talks
              .Where(t => t.Camp.Moniker == moniker)
              .Select(t => t.Speaker)
              .Where(s => s != null)
              .OrderBy(s => s.LastName)
              .Distinct();

            return query.ToList();
        }

        public PagingModel<Speaker> FetchSpeakers(int pageSize, int pageNumber, string firstName)
        {
            IQueryable<Speaker> query = _context.Speakers;

            if (!string.IsNullOrEmpty(firstName))
                query = query
                  .Where(x => x.FirstName.Contains(firstName));

            return new PagingModel<Speaker>
            {
                Items = query.ToList().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList(),
                TotalCount = query.ToList().Count()
            };
        }

        public List<Speaker> GetAllSpeakersAsync()
        {
            var query = _context.Speakers
              .OrderBy(t => t.LastName);

            return query.ToList();
        }


        public Speaker GetSpeaker(int speakerId)
        {
            var query = _context.Speakers
              .Where(t => t.SpeakerId == speakerId);

            return query.FirstOrDefault();
        }
    }
}
