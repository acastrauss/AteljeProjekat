///////////////////////////////////////////////////////////
//  DBCRUDAteljeDelete.cs
//  Implementation of the Class DBCRUDAteljeDelete
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 4:44:26 PM
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
	public class DBCRUDAteljeDelete : DBCRUDAteljeCommand {

		public EntitetSistema entitet { get; set; }

		public DBCRUDAteljeDelete(){

		}

		public DBCRUDAteljeDelete(EntitetSistema entitetSistema)
        {
			this.entitet = entitetSistema;
        }

		~DBCRUDAteljeDelete(){

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

		public EntitetSistema Entitet{
			get{
				return entitet;
			}
			set{
				entitet = value;
			}
		}

		public override void Execute(){
			this.Delete(((Atelje)this.entitet).Id);
		}

		public override void Unexecute(){
			this.Create(this.entitet);
		}

	}//end DBCRUDAteljeDelete

}//end namespace Atelje