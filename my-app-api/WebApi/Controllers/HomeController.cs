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
        public IHttpActionResult FetchCamps(int pageSize, int pageNumber, DateTime? eventDate = null)
        {
            PagingModel<Camp> camps = _repository.FetchCamps(pageNumber, pageSize, eventDate);

            PagingBindingModel<CampBindingModel> campPagingModel = new PagingBindingModel<CampBindingModel>
            {
                Items = camps.Items.Select(x => x.ToCampBindingModel()).ToList(),
                TotalCount = camps.TotalCount,
            };

            return Ok(camps);
        }

        [Route("getAllCamps")]
        [HttpGet]
        public IHttpActionResult GetAllCamps()
        {
            List<Camp> camps = _repository.GetAllCamps();
            var campsBindingModels = camps.Select(x => x.ToCampBindingModel()).ToList();

            return Ok(campsBindingModels);
        }

        [Route("addCamp")]
        [HttpPost]
        public void AddCamp(CampBindingModel bindingModel)
        {
            Country country = null;
            City city = null;

            if(_repository.IsDublicateMonikerName(bindingModel.Moniker))
                throw new BusinessRuleException("Moniker Name can not be dublicated");

            if (bindingModel.CountryId.HasValue)
            {
                country = _repository.GetCountry(bindingModel.CountryId.Value);
            }


            if (bindingModel.CityId.HasValue)
            {
                city = _repository.GetCity(bindingModel.CityId.Value);
            }

            Camp camp = Camp.NewInstance(bindingModel.Name, bindingModel.Moniker, bindingModel.EventDate, country, city, bindingModel.Latitude, bindingModel.Longitude);

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

            City city = null;

            if (bindingModel.CityId.HasValue)
            {
                city = _repository.GetCity(bindingModel.CityId.Value);
            }

            Camp camp = _repository.GetCamp(bindingModel.CampId);

            if (_repository.IsDublicateMonikerName(bindingModel.Moniker, camp.CampId, true))
                throw new BusinessRuleException("Moniker Name can not be dublicated");

            if (camp == null)
                new BusinessRuleException("Camp is not found");

            Camp newCamp = camp.Update(bindingModel.CampId, bindingModel.Name, bindingModel.Moniker, bindingModel.EventDate, country, city, bindingModel.Latitude, bindingModel.Longitude);

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

        [Route("getTalksByCamp")]
        [HttpGet]
        public IHttpActionResult GetTalksByCamp([FromUri]FetchCampsBindingModel bindingModel)
        {
            PagingModel<Talk> talks = _repository.GetTalksByCampAsync(bindingModel.PageNumber, bindingModel.PageSize, bindingModel.MonikerName, true);

            PagingBindingModel<TalkBindingModel> talkPagingModel = new PagingBindingModel<TalkBindingModel>
            {
                Items = talks.Items.Select(x => x.ToTalkBindingModel()).ToList(),
                TotalCount = talks.TotalCount,
            };

            return Ok(talkPagingModel);
        }

        [Route("getTalk")]
        [HttpGet]
        public IHttpActionResult GetTalk(int talkId)
        {
            Talk talk = _repository.GetTalkByIdAsync(talkId, true);

            if (talk == null)
                new BusinessRuleException("Talk is not found");

            TalkBindingModel talkBindingModel = talk.ToTalkBindingModel();

            return Ok(talkBindingModel);
        }

        [Route("updateTalk")]
        [HttpPost]
        public IHttpActionResult UpdateTalk(TalkBindingModel bindingModel)
        {
            Camp camp = _repository.GetCamp(bindingModel.CampId);
            Speaker speaker = _repository.GetSpeaker(bindingModel.SpeakerId);
            Talk talk = _repository.GetTalkByIdAsync(bindingModel.TalkId);

            if (talk == null)
                new BusinessRuleException("Talk is not found");

            var talkToUpdated = talk.Update(bindingModel.TalkId, bindingModel.Title, bindingModel.Abstract, camp, speaker);
            _repository.UpdateTalk(talkToUpdated);

            return Ok();
        }

        [Route("addTalk")]
        [HttpPost]
        public IHttpActionResult AddTalk(TalkBindingModel bindingModel)
        {
            Camp camp = _repository.GetCamp(bindingModel.CampId);
            Speaker speaker = _repository.GetSpeaker(bindingModel.SpeakerId);

            Talk talk = Talk.Create(bindingModel.Title, bindingModel.Abstract, camp, speaker);

            _repository.AddTalk(talk);

            return Ok();
        }

        [Route("deleteTalk")]
        [HttpPost]
        public IHttpActionResult DeleteTalk(TalkBindingModel bindingModel)
        {
            Talk talk = _repository.GetTalkByIdAsync(bindingModel.TalkId);

            _repository.DeleteTalk(talk);

            return Ok();
        }


        [Route("getAllSpeakers")]
        [HttpGet]
        public IHttpActionResult GetAllSpeakers()
        {
            List<Speaker> speakers = _repository.GetAllSpeakersAsync();

            List<SpeakerBindingModel> speakersBindingModel = speakers.Select(x => x.ToSpeakerBindingModel()).ToList();

            return Ok(speakersBindingModel);
        }

        [Route("fetchSpeakers")]
        [HttpGet]
        public IHttpActionResult FetchSpeakers([FromUri]FetchSpeakerBindingModel bindingModel)
        {
            PagingModel<Speaker> speakers = _repository.FetchSpeakers(bindingModel.PageSize, bindingModel.PageNumber, bindingModel.FirstName);

            PagingBindingModel<SpeakerBindingModel> speakersBindingModel = new PagingBindingModel<SpeakerBindingModel>()
            {
                Items = speakers.Items.Select(x => x.ToSpeakerBindingModel()).ToList(),
                TotalCount = speakers.TotalCount
            };

            return Ok(speakersBindingModel);
        }

        [Route("addSpeaker")]
        [HttpPost]
        public IHttpActionResult AddSpeaker(SpeakerBindingModel bindingModel)
        {
            Speaker speaker = Speaker.Create(bindingModel.FirstName, bindingModel.LastName, bindingModel.MiddleName, bindingModel.Company);

            _repository.AddSpeaker(speaker);

            return Ok();
        }

        [Route("updateSpeaker")]
        [HttpPost]
        public IHttpActionResult UpdateSpeaker(SpeakerBindingModel bindingModel)
        {
            Speaker speaker = _repository.GetSpeaker(bindingModel.SpeakerId);

            speaker = speaker.Update(bindingModel.SpeakerId, bindingModel.FirstName, bindingModel.LastName, bindingModel.MiddleName, bindingModel.Company);

            _repository.UpdateSpeaker(speaker);

            return Ok();
        }

        [Route("getSpeaker")]
        [HttpGet]
        public IHttpActionResult GetSpeaker(int speakerId)
        {
            Speaker speaker = _repository.GetSpeaker(speakerId);

            if (speaker == null)
                new BusinessRuleException("Speaker is not found");

            SpeakerBindingModel bindingModel = speaker.ToSpeakerBindingModel();

            return Ok(bindingModel);
        }

        [Route("addCountry")]
        [HttpPost]
        public IHttpActionResult AddCountry(CountryBindingModel bindingModel)
        {
            Country country = Country.Create(bindingModel.Name);

            _repository.AddCountry(country);

            return Ok();
        }

        [Route("updateCountry")]
        [HttpPost]
        public IHttpActionResult UpdateCountry(CountryBindingModel bindingModel)
        {
            Country country = _repository.GetCountry(bindingModel.Id);

            if (country == null)
                new BusinessRuleException("Country is not found");

            country = country.Update(bindingModel.Name);

            _repository.UpdateCountry(country);

            return Ok();
        }

        [Route("getCountry")]
        [HttpGet]
        public IHttpActionResult GetCountry(int countryId)
        {
            Country country = _repository.GetCountry(countryId);

            if (country == null)
                new BusinessRuleException("Country is not found");

            return Ok(country);
        }

        [Route("getCitiesByCountry")]
        [HttpGet]
        public IHttpActionResult GetCitiesByCountry(int countryId)
        {
            List<CityBindingModel> cities = _repository.GetCitiesByCountries(countryId).Select(x => x.ToCityBindingModel()).ToList();

            return Ok(cities);
        }

        [Route("fetchCities")]
        [HttpGet]
        public IHttpActionResult FetchCities([FromUri]FetchCityBindingModel bindingModel)
        {
            PagingModel<City> cities = _repository.FetchCities(bindingModel.PageSize, bindingModel.PageNumber, bindingModel.CountryId);

            PagingBindingModel<CityBindingModel> citiesBindingModel = new PagingBindingModel<CityBindingModel>()
            {
                Items = cities.Items.Select(x => x.ToCityBindingModel()).ToList(),
                TotalCount = cities.TotalCount
            };

            return Ok(citiesBindingModel);
        }

        [Route("getCity")]
        [HttpGet]
        public IHttpActionResult GetCity(int cityId)
        {
            CityBindingModel city = _repository.GetCity(cityId).ToCityBindingModel();

            return Ok(city);
        }

        [Route("addCity")]
        [HttpPost]
        public IHttpActionResult AddCity(CityBindingModel bindingModel)
        {
            Country country = _repository.GetCountry(bindingModel.CountryId);

            City city = City.Create(bindingModel.Name, country);

            _repository.AddCity(city);

            return Ok();
        }

        [Route("updateCity")]
        [HttpPost]
        public IHttpActionResult UpdateCity(CityBindingModel bindingModel)
        {
            Country country = _repository.GetCountry(bindingModel.CountryId);

            City city = _repository.GetCity(bindingModel.Id);

            city = city.Update(bindingModel.Name, country);

            _repository.UpdateCity(city);

            return Ok();
        }

        [Route("deleteCity")]
        [HttpPost]
        public IHttpActionResult DeleteCity(CityBindingModel bindingModel)
        {
            City city = _repository.GetCity(bindingModel.Id);

            _repository.DeleteCity(city);

            return Ok();
        }
    }
}
