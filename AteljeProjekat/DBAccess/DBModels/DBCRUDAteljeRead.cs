///////////////////////////////////////////////////////////
//  DBCRUDAteljeRead.cs
//  Implementation of the Class DBCRUDAteljeRead
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 4:44:25 PM
//  Original author: acast
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using DBAccess;
using System.Linq;


using Atelje;
namespace Atelje {
	public class DBCRUDAteljeRead : DBCRUDAteljeCommand {

		private List<EntitetSistema> entitet;

		public DBCRUDAteljeRead(){

		}

		~DBCRUDAteljeRead(){

		}

		public List<EntitetSistema> Entiteti{
			get{
				return entitet;
			}
		}

		public override void Execute(){
			this.entitet = this.Read();
		}

		public override List<EntitetSistema> Read(){
			var retVal = new List<EntitetSistema>();
			
			using (var db = AteljeDB.Instance())
            {
				IDBConvert convert = new DBConvertAtelje();

				retVal.AddRange(db.Ateljes.Select(x => (Atelje)convert.ConvertToWebModel(x)));
            }

			return retVal;
		}

	}//end DBCRUDAteljeRead

}//end namespace Atelje