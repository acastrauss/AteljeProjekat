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
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AutorController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AutorController>
        [HttpPost]
        public Atelje.Autor Create([FromBody] object value)
        {
            try
            {
                var a = JsonConvert.DeserializeObject<Atelje.Autor>(value.ToString());
                a.m_UmetnickoDelo = new List<UmetnickoDelo>();
                DBCRUD db = new DBCRUDUmetnik();
                db.Create(a);
                return a;
            }
            catch (Exception)
            {
                return null;
            }

        }

        // PUT api/<AutorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AutorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
