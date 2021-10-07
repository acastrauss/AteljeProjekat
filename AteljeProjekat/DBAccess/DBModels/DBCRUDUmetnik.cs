///////////////////////////////////////////////////////////
//  DBCRUDUmetnik.cs
//  Implementation of the Class DBCRUDUmetnik
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 4:44:24 PM
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
	public class DBCRUDUmetnik : DBCRUD {

		public DBCRUDUmetnik(){

		}

		~DBCRUDUmetnik(){

		}

		/// 
		/// <param name="entitet"></param>
		public override void Create(EntitetSistema entitet){
			var db = AteljeDB.Instance();

			konverzija = new DBConvertAutor();

			db.Autors.Add((DBAccess.Autor)konverzija.ConvertToDBModel(entitet));
			db.SaveChanges();
		}

		/// 
		/// <param name="id"></param>
		public override void Delete(int id){
			var db = AteljeDB.Instance();
            
			if(db.Autors.Where(x => x.Id == id).Count() != 0)
            {
				db.Autors.Remove(db.Autors.Where(x => x.Id == id).First());
				db.SaveChanges();
            }
			else
            {
				throw new Exception("Autor ne postoji.");
            }
		}

		public override List<EntitetSistema> Read(){
			var retVal = new List<EntitetSistema>();

			var db = AteljeDB.Instance();
            
			konverzija = new DBConvertAutor();

			retVal.AddRange(db.Ateljes.Select(x => (Autor)konverzija.ConvertToWebModel(x)));

			return retVal;
		}

		/// 
		/// <param name="noviEntitet"></param>
		public override void Update(EntitetSistema noviEntitet){
			var a = (Autor)noviEntitet;

			var db = AteljeDB.Instance();
            
			if(db.Autors.Where(x => x.Id == a.Id).Count() != 0)
            {
				konverzija = new DBConvertAutor();

				var curr = db.Autors.Where(x => x.Id == a.Id).First();
				db.Autors.Remove(curr);
				db.Autors.Add((DBAccess.Autor)konverzija.ConvertToDBModel(a));
				db.SaveChanges();
            }
            
		}

	}//end DBCRUDUmetnik

}//end namespace Atelje