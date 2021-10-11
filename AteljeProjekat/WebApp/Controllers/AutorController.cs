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
    public class AutorController : ControllerBase
    {
        // GET: api/<AutorController>
        [HttpGet]
        public IEnumerable<Autor> GetAll()
        {
            DBCRUD db = new DBCRUDUmetnik();

            return db.Read().Select(x => (Autor)x);
        }

        [HttpGet]
        public Atelje.Autor GetOne([FromQuery] int id)
        {
            DBCRUD db = new DBCRUDUmetnik();

            return (Atelje.Autor)db.Read().Where(x => ((Atelje.Autor)x).Id == id).First();
        }

        // POST api/<AutorController>
        [HttpPost]
        public Atelje.Autor Create([FromBody] object value)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var a = JsonConvert.DeserializeObject<Atelje.Autor>(value.ToString());
                a.UmetnickaDela = new List<UmetnickoDelo>();
                DBCRUD db = new DBCRUDUmetnik();
                db.Create(a);

                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Napravljen autor id:{0}", a.Id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return a;
            }
            catch (Exception)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom pravljenja autora");
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return null;
            }

        }

        [HttpPost]
        public Autor Update([FromBody] object value)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var a = JsonConvert.DeserializeObject<Atelje.Autor>(value.ToString());
                DBCRUD db = new DBCRUDUmetnik();
                db.Update(a);

                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Izmenjen autor id:{0}", a.Id);
                logPodatak.sistemLog.UpisiLog(logPodatak);
                return a;
            }
            catch (Exception e)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom izmene autora");
                logPodatak.sistemLog.UpisiLog(logPodatak);
                return null;
            }

        }

        // PUT api/<AutorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete]
        public int Delete([FromQuery] int id)
        {
            LogPodatak logPodatak = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                DBCRUD db = new DBCRUDUmetnik();
                DBCRUD dbUd = new DBCRUDUmetnickoDelo();

                var u = (Atelje.Autor)db.Read().Where(x => ((Atelje.Autor)x).Id == id).FirstOrDefault();

                foreach (var d in u.UmetnickaDela)
                {
                    dbUd.Delete(d.Id);
                }

                db.Delete(id);
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.INFO;
                logPodatak.Poruka = String.Format("Izbrisan autor id:{0}", id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return id;
            }
            catch (Exception e)
            {
                logPodatak.Vreme = DateTime.Now;
                logPodatak.Tip = LogTip.ERROR;
                logPodatak.Poruka = String.Format("Greska prilikom brisanja autora id:{0}", id);
                logPodatak.sistemLog.UpisiLog(logPodatak);

                return -1;
            }
        }
    }
}
