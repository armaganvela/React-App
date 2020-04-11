using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.BindingModels;
using WebApi.Infrastucture;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/camp")]
    public class CampController : ApiController
    {
        private readonly ICampRepository _repository;

        public CampController(ICampRepository repository)
        {
            _repository = repository;
        }

        [Route("getCamps")]
        [HttpGet]
        public IHttpActionResult FetchCamps(int pageSize, int pageNumber)
        {
            PagingModel<Camp> camps = _repository.FetchCamps(pageNumber, pageSize);

            CampPagingModel campPagingModel = new CampPagingModel
            {
                Items = camps.Items.Select(x => x.ToCampBindingModel()).ToList(),
                TotalCount = camps.TotalCount,
            };

            return Ok(camps);
        }

        [Route("addCamp")]
        [HttpPost]
        public void AddCamp(CampBindingModel bindingModel)
        {
            Country country = null;

            if (bindingModel.CountryId.HasValue)
            {
                country = _repository.GetCountry(bindingModel.CountryId.Value);
            }

            Camp camp = Camp.NewInstance(bindingModel.Name, bindingModel.Moniker, bindingModel.EventDate, country);

            _repository.AddCamp(camp);
        }

        [Route("updateCamp")]
        [HttpPost]
        public void UpdateCamp(CampBindingModel bindingModel)
        {
            Country country = null;

            if (bindingModel.CountryId.HasValue)
            {
                country = _repository.GetCountry(bindingModel.CountryId.Value);
            }

            Camp camp = _repository.GetCamp(bindingModel.CampId);

            if (camp == null)
                new BusinessRuleException("Camp is not found");

            Camp newCamp = camp.Update(bindingModel.CampId, bindingModel.Name, bindingModel.Moniker, bindingModel.EventDate, country);

            _repository.UpdateCamp(newCamp);
        }

        [Route("getCamp")]
        public IHttpActionResult GetCamp(int campId)
        {
            Camp camp = _repository.GetCamp(campId);

            if (camp == null)
                throw new BusinessRuleException("Camp is not found");

            return Ok(camp.ToCampBindingModel());
        }

        [Route("deleteCamp")]
        [HttpPost]
        public IHttpActionResult DeleteCamp(DeleteCampBindingModel bindingModel)
        {
            Camp camp = _repository.GetCamp(bindingModel.CampId);

            if (camp == null)
                throw new BusinessRuleException("Camp is not found");
            _repository.DeleteCamp(camp);

            return Ok();

        }

        [Route("getAllCountries")]
        [HttpGet]
        public IHttpActionResult GetAllCountries()
        {
            List<Country> countries = _repository.GetAllCountries();

            return Ok(countries);
        }

        [Route("getByMonikerName")]
        [HttpGet]
        public IHttpActionResult GetByMonikerName()
        {
            List<Camp> countries = _repository.GetAllCampsAsync(true);

            return Ok(countries);
        }
    }
}
