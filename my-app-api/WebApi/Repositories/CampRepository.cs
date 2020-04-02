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
            List<Camp> camps = _context.Camps.ToList().Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList();

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
            return _context.Camps.FirstOrDefault(x => x.CampId == id);
        }

        public void DeleteCamp(Camp camp)
        {
            _context.Camps.Remove(camp);

            _context.SaveChanges();
        }
    }
}
