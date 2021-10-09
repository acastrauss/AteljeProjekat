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
            return db.Read().Select(x => (Atelje.UmetnickoDelo)x);
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
            try
            {
                var ud = JsonConvert.DeserializeObject<Atelje.UmetnickoDelo>(value.ToString());
                Atelje.DBCRUD db = new Atelje.DBCRUDUmetnickoDelo();
                db.Create(ud);
                return ud;
            }
            catch (Exception e)
            {
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
            try
            {
                DBCRUD db = new DBCRUDUmetnickoDelo();
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
