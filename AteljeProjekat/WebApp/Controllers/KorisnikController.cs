using Atelje;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/{controller}/{action}")]
    [ApiController]
    public class KorisnikController : ControllerBase
    {
        
        // GET: api/<KorisnikController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<KorisnikController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public KorisnikSistema UserId([FromBody]object value)
        {
            try
            {
                var dict = JsonConvert.DeserializeObject<Dictionary<string, string>>(value.ToString());
                var userName = dict["username"];
                var password = dict["password"];

                DBCRUD db = new DBCRUDKorisnik();
                return ((DBCRUDKorisnik)db).KorisnikId(userName, password);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // POST api/<KorisnikController>
        [HttpPost]
        public int Register([FromBody] object value)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var k = JsonConvert.DeserializeObject<Atelje.KorisnikSistema>(value.ToString());
                DBCRUD db = new DBCRUDKorisnik();
                db.Create(k);
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Registrovan korisnik id:{0}", k.Id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return 0;
            }
            catch (Exception e)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom registrovanja korisnika");
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return -1;
            }
        }

        [HttpPost]
        public int Update([FromBody] object value)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var k = JsonConvert.DeserializeObject<Atelje.KorisnikSistema>(value.ToString());
                DBCRUD db = new DBCRUDKorisnik();
                db.Update(k);

                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Izmenjen korisnik id:{0}", k.Id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return 0;
            }
            catch (Exception e)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom izmene korisnika");
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return -1;
            }
        }

        // PUT api/<KorisnikController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<KorisnikController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
