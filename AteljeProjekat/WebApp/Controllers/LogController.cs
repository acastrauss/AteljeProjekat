using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/{controller}/{action}")]
    [ApiController]
    public class LogController : ControllerBase
    {
        // GET: api/<LogController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<LogController>/5
        [HttpGet]
        public async Task<FileStreamResult> UserLog([FromQuery]int id)
        {
            var rootDir = Directory.GetCurrentDirectory();

            var fname = Path.Join(rootDir, "UsersLog", String.Format("{0}.csv", id));

            var mimeType = "text/csv";

            return new FileStreamResult(System.IO.File.OpenRead(fname), mimeType);
        }

        // GET api/<LogController>/5
        [HttpGet]
        public async Task<FileStreamResult> SistemLog()
        {
            var rootDir = Directory.GetCurrentDirectory();

            var fname = Path.Join(rootDir, "SistemLog", "SistemLog.csv");

            var mimeType = "text/csv";

            return new FileStreamResult(System.IO.File.OpenRead(fname), mimeType);
        }

        // POST api/<LogController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<LogController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LogController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
