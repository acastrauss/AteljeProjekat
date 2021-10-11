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
			AteljeDB db;
            lock (db = AteljeDB.Instance())
            {
				konverzija = new DBConvertAutor();

				db.Autors.Add((DBAccess.Autor)konverzija.ConvertToDBModel(entitet));
				db.SaveChanges();
			}
		}

		/// 
		/// <param name="id"></param>
		public override void Delete(int id){
			AteljeDB db;
            lock (db = AteljeDB.Instance())
            {
				if (db.Autors.Where(x => x.Id == id).Count() != 0)
				{
					db.Autors.Remove(db.Autors.Where(x => x.Id == id).First());
					db.SaveChanges();
				}
				else
				{
					throw new Exception("Autor ne postoji.");
				}
			}
		}

		public override List<EntitetSistema> Read(){
			var retVal = new List<EntitetSistema>();
			AteljeDB db;

            lock (db = AteljeDB.Instance())
            {
				konverzija = new DBConvertAutor();

                foreach (var a in db.Autors)
                {
					retVal.Add((Autor)konverzija.ConvertToWebModel(a));
                }
			}

			return retVal;
		}

		/// 
		/// <param name="noviEntitet"></param>
		public override void Update(EntitetSistema noviEntitet){
			var a = (Autor)noviEntitet;
			AteljeDB db;
            lock (db = AteljeDB.Instance())
            {
				var currAt = db.Autors.Where(x => x.Id == a.Id);

				if(currAt.Count() > 0)
                {
					var udArr = new List<DBAccess.UmetnickoDelo>();

					foreach (var ud in db.UmetnickoDeloes)
					{
						if (ud.AutorId == currAt.First().Id)
						{
							udArr.Add(ud);
							db.UmetnickoDeloes.Remove(ud);
						}
					}

					db.SaveChanges();

					konverzija = new DBConvertAutor();

					db.Autors.Remove(currAt.First());
					var noviDb = (DBAccess.Autor)konverzija.ConvertToDBModel(noviEntitet);
					db.Autors.Add(noviDb);
					db.SaveChanges();
				}
			}
		}

	}//end DBCRUDUmetnik

}//end namespace Atelje