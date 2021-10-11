using Atelje;
using Microsoft.AspNetCore.Mvc;
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
    public class UmetnickoDeloController : ControllerBase
    {
        // GET: api/<UmetnickoDeloController>
        [HttpGet]
        public IEnumerable<Atelje.UmetnickoDelo> GetAll()
        {
            Atelje.DBCRUD db = new Atelje.DBCRUDUmetnickoDelo();
            var uds = db.Read();
            return uds.Select(x => (Atelje.UmetnickoDelo)x);
        }

        [HttpGet]
        public Atelje.UmetnickoDelo GetOne([FromQuery] int id)
        {
            DBCRUD db = new DBCRUDUmetnickoDelo();

            return (Atelje.UmetnickoDelo)db.Read().Where(x => ((Atelje.UmetnickoDelo)x).Id == id).First();
        }

        // POST api/<UmetnickoDeloController>
        [HttpPost]
        public Atelje.UmetnickoDelo Create([FromBody] object value)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var ud = JsonConvert.DeserializeObject<Atelje.UmetnickoDelo>(value.ToString());
                Atelje.DBCRUD db = new Atelje.DBCRUDUmetnickoDelo();
                db.Create(ud);
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Kreirano umetnicko delo id:{0}", ud.Id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return ud;
            }
            catch (Exception e)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom kreiranja umetnickog dela");
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return null;
            }
        }

        [HttpPost]
        public UmetnickoDelo Update([FromBody] object value)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var ud = JsonConvert.DeserializeObject<Atelje.UmetnickoDelo>(value.ToString());
                DBCRUD db = new DBCRUDUmetnickoDelo();
                db.Update(ud);
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Izmenjeno umetnicko delo id:{0}", ud.Id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return ud;
            }
            catch (Exception)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom izmene umetnickog dela");
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return null;
            }
        }

        // PUT api/<UmetnickoDeloController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UmetnickoDeloController>/5
        [HttpDelete]
        public int Delete([FromQuery]int id)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                DBCRUD db = new DBCRUDUmetnickoDelo();
                db.Delete(id);
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Izbrisano umetnicko delo id:{0}", id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return id;
            }
            catch (Exception e)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom brisanja umetnickog dela id:{0}", id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return -1;
            }
        }
    }
}
