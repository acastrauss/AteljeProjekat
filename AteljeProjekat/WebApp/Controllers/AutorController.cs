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
            try
            {
                var a = JsonConvert.DeserializeObject<Atelje.Autor>(value.ToString());
                a.UmetnickaDela = new List<UmetnickoDelo>();
                DBCRUD db = new DBCRUDUmetnik();
                db.Create(a);
                return a;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpPost]
        public Autor Update([FromBody] object value)
        {
            try
            {
                var a = JsonConvert.DeserializeObject<Atelje.Autor>(value.ToString());
                DBCRUD db = new DBCRUDUmetnik();
                db.Update(a);
                return a;
            }
            catch (Exception e)
            {
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
                return id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
