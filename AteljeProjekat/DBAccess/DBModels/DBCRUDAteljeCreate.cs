///////////////////////////////////////////////////////////
//  DBCRUDAteljeCreate.cs
//  Implementation of the Class DBCRUDAteljeCreate
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 4:44:25 PM
//  Original author: acast
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;


using DBAccess;
using Atelje;
using System.Linq;

namespace Atelje {
	public class DBCRUDAteljeCreate : DBCRUDAteljeCommand {

		public EntitetSistema entiet { get; set; }

		public DBCRUDAteljeCreate(){
			this.CommandType = COMMAND_TYPE.CREATE;
		}

		public DBCRUDAteljeCreate(EntitetSistema entitetSistema)
        {
			this.entiet = entitetSistema;
			this.CommandType = COMMAND_TYPE.CREATE;
        }

		~DBCRUDAteljeCreate(){

		}

		/// 
		/// <param name="entitet"></param>
		public override void Create(EntitetSistema entitet){

			AteljeDB db;
            lock (db = AteljeDB.Instance())
            {
				konverzija = new DBConvertAtelje();
				db.Ateljes.Add((DBAccess.Atelje)konverzija.ConvertToDBModel(entitet));
				db.SaveChanges();
			}
		}

		/// 
		/// <param name="id"></param>
		public override void Delete(int id){
			AteljeDB db;

            lock (db = AteljeDB.Instance())
            {
				var currAt = db.Ateljes.Where(x => x.Id == id);

				if (currAt.Count() != 0)
				{
					db.Ateljes.Remove(currAt.First());
					db.SaveChanges();
				}
			}
		}

		public EntitetSistema Entiet{
			get{
				return entiet;
			}
			set{
				entiet = value;
			}
		}

		public override void Execute(){
			this.Create(this.entiet);
		}

		public override void Unexecute(){
			this.Delete(((Atelje)this.entiet).Id);
		}

	}//end DBCRUDAteljeCreate

}//end namespace Atelje