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


        // GET: api/<AteljeController>
        [HttpGet]
        public IEnumerable<Atelje.Atelje> GetAll()
        {
            DBCRUDAteljeRead read = new DBCRUDAteljeRead();
            read.Execute();
            return read.Entiteti.Select(x => (Atelje.Atelje)x); 
        }

        // GET api/<AteljeController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AteljeController>
        [HttpPost]
        public Atelje.Atelje Create([FromBody] object value)
        {
            try
            {
                var atelje = JsonConvert.DeserializeObject<Atelje.Atelje>(value.ToString());
                DBCRUDAteljeCreate db = new DBCRUDAteljeCreate();
                db.entiet = atelje;
                _invoker.AddComand(db);
                _invoker.ExecuteLast();
                return atelje;
            }
            catch (Exception e)
            {
                return null;
            }

        }

        // PUT api/<AteljeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AteljeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
