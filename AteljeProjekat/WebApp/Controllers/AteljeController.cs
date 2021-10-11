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
    public class AteljeController : ControllerBase
    {
        private DBCRUDAteljeInvoker _invoker;

        public AteljeController()
        {
            _invoker = new DBCRUDAteljeInvoker();
        }

        [HttpGet]
        public bool Redo()
        {
            LogPodatak log = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                _invoker.Redo();
                log.Poruka = "Odradjena \"Redo\" komanda nad bazom Ateljea.";
                log.Tip = LogTip.INFO;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);
                return true;
            }
            catch (Exception)
            {
                log.Poruka = "Greska prilikom \"Redo\" komande nad bazom Ateljea.";
                log.Tip = LogTip.ERROR;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);
                return false;
            }
        }

        [HttpGet]
        public bool Undo()
        {
            LogPodatak log = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                _invoker.Undo();
                log.Poruka = "Odradjena \"Undo\" komanda nad bazom Ateljea.";
                log.Tip = LogTip.INFO;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);
                return true;
            }
            catch (Exception)
            {
                log.Poruka = "Greska prilikom \"Undo\" komande nad bazom Ateljea.";
                log.Tip = LogTip.ERROR;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);
                return false;
            }
        }

        [HttpGet]
        public IEnumerable<Atelje.DBCRUDAteljeCommand> GetCommands()
        {
            return DBCRUDAteljeInvoker.komande.Count != 0 ?
                DBCRUDAteljeInvoker.komande.GetRange(0, DBCRUDAteljeInvoker.cntComm + 1) :
                new List<DBCRUDAteljeCommand>();
        }

        // GET: api/<AteljeController>
        [HttpGet]
        public IEnumerable<Atelje.Atelje> GetAll()
        {
            DBCRUDAteljeRead read = new DBCRUDAteljeRead();
            read.Execute();
            return read.Entiteti.Select(x => (Atelje.Atelje)x); 
        }

        // GET api/<AteljeController>/5
        [HttpGet]
        public Atelje.Atelje GetOne([FromQuery] int id)
        {
            DBCRUD db = new DBCRUDAteljeRead();

            return (Atelje.Atelje)db.Read().Where(x => ((Atelje.Atelje)x).Id == id).First();
        }

        [HttpPost]

        public Atelje.Atelje Double([FromBody] object value)
        {
            LogPodatak log = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var atelje = JsonConvert.DeserializeObject<Atelje.Atelje>(value.ToString());
                DBCRUDAteljeCreate db = new DBCRUDAteljeCreate();
                db.entiet = atelje;
                _invoker.AddComand(db);
                _invoker.ExecuteLast();
                log.Poruka = String.Format("Dupliranje ateljea id:{0}", atelje.Id);
                log.Tip = LogTip.INFO;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);
                return atelje;
            }
            catch (Exception e)
            {
                log.Poruka = String.Format("Greska priliko dupliranje ateljea");
                log.Tip = LogTip.ERROR;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);
                return null;
            }
        }

        // POST api/<AteljeController>
        [HttpPost]
        public Atelje.Atelje Create([FromBody] object value)
        {
            LogPodatak log = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var atelje = JsonConvert.DeserializeObject<Atelje.Atelje>(value.ToString());
                DBCRUDAteljeCreate db = new DBCRUDAteljeCreate();
                db.entiet = atelje;
                _invoker.AddComand(db);
                _invoker.ExecuteLast();
                log.Poruka = String.Format("Kreiranje ateljea id:{0}", atelje.Id);
                log.Tip = LogTip.INFO;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);

                return atelje;
            }
            catch (Exception e)
            {
                log.Poruka = String.Format("Greska prilikom kreiranja ateljea");
                log.Tip = LogTip.ERROR;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);

                return null;
            }

        }

        [HttpPost]
        public Atelje.Atelje Update([FromBody] object value)
        {
            LogPodatak log = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                var a = JsonConvert.DeserializeObject<Atelje.Atelje>(value.ToString());
                DBCRUDAteljeUpdate db = new DBCRUDAteljeUpdate();
                db.EntitetPosle = a;
                _invoker.AddComand(db);
                _invoker.ExecuteLast();
                log.Poruka = String.Format("Izmenjen atelje id:{0}", a.Id);
                log.Tip = LogTip.INFO;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);

                return a;
            }
            catch (Exception e)
            {
                log.Poruka = String.Format("Greska prilikom izmene ateljea");
                log.Tip = LogTip.ERROR;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);
                return null;
            }
        }

        // PUT api/<AteljeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AteljeController>/5
        [HttpDelete]
        public int Delete([FromQuery] int id)
        {
            LogPodatak log = new LogPodatak(new KorisnikLogCSV(), new SistemLogCSV());

            try
            {
                DBCRUDAteljeDelete db = new DBCRUDAteljeDelete();
                db.entitet = new Atelje.Atelje()
                {
                    Id = id
                };

                _invoker.AddComand(db);
                _invoker.ExecuteLast();
                log.Poruka = String.Format("Izbrisan atelje id:{0}", id);
                log.Tip = LogTip.INFO;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);

                return id;
            }
            catch (Exception e)
            {
                log.Poruka = String.Format("Greska prilikom brisanja ateljea id:{0}", id);
                log.Tip = LogTip.ERROR;
                log.Vreme = DateTime.Now;
                log.sistemLog.UpisiLog(log);

                return -1;
            }

        }
    }
}
