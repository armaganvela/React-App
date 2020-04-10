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
    }
}
