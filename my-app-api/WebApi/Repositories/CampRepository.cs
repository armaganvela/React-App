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

        public PagingModel<Camp> FetchCamps(int pageNumber, int pageSize)
        {
            int totalCount = _context.Camps.Count();
            List<Camp> camps = _context.Camps.Include(camp => camp.Country).ToList().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList();

            return new PagingModel<Camp>
            {
                Items = camps,
                TotalCount = totalCount
            };
        }

        public Camp AddCamp(Camp camp)
        {
            _context.Camps.Add(camp);
            int campId = _context.SaveChanges();

            return camp;
        }

        public Camp UpdateCamp(Camp camp)
        {
            Camp campToUpdated = _context.Camps.FirstOrDefault(x => x.CampId == camp.CampId);

            campToUpdated.EventDate = camp.EventDate;
            campToUpdated.Name = camp.Name;
            campToUpdated.Moniker = camp.Moniker;

            _context.SaveChanges();

            return campToUpdated;
        }

        public Camp GetCamp(int id)
        {
            return _context.Camps.Include(x => x.Country).FirstOrDefault(x => x.CampId == id);
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
        }

        public void AddSpeaker(Speaker speaker)
        {
            _context.Speakers.Add(speaker);
        }

        public void DeleteTalk(Talk talk)
        {
            _context.Talks.Remove(talk);
        }

        public void DeleteSpeaker(Speaker speaker)
        {
            _context.Speakers.Remove(speaker);
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

        public Camp GetCampAsync(string moniker, bool includeTalks = false)
        {
            IQueryable<Camp> query = _context.Camps
                .Include(c => c.Country);

            if (includeTalks)
            {
                query = query.Include(c => c.Talks.Select(t => t.Speaker));
            }

            // Query It
            query = query.Where(c => c.Moniker == moniker);

            return query.FirstOrDefault();
        }

        public List<Talk> GetTalksByMonikerAsync(string moniker, bool includeSpeakers = false)
        {
            IQueryable<Talk> query = _context.Talks;

            if (includeSpeakers)
            {
                query = query
                  .Include(t => t.Speaker);
            }

            // Add Query
            query = query
              .Where(t => t.Camp.Moniker == moniker)
              .OrderByDescending(t => t.Title);

            return query.ToList();
        }

        public Talk GetTalkByMonikerAsync(string moniker, int talkId, bool includeSpeakers = false)
        {
            IQueryable<Talk> query = _context.Talks;

            if (includeSpeakers)
            {
                query = query
                  .Include(t => t.Speaker);
            }

            // Add Query
            query = query
              .Where(t => t.TalkId == talkId && t.Camp.Moniker == moniker);

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
