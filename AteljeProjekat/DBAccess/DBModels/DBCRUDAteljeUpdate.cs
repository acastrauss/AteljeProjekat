///////////////////////////////////////////////////////////
//  DBCRUDAteljeUpdate.cs
//  Implementation of the Class DBCRUDAteljeUpdate
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
	public class DBCRUDAteljeUpdate : DBCRUDAteljeCommand {

		private EntitetSistema entitetPosle;
		private EntitetSistema entitetPre;

		public DBCRUDAteljeUpdate(){

		}

		~DBCRUDAteljeUpdate(){

		}

		public DBCRUDAteljeUpdate(EntitetSistema pre, EntitetSistema posle)
        {
			this.entitetPosle = posle;
			this.entitetPre = pre;
        }

		public EntitetSistema EntitetPosle{
			get{
				return entitetPosle;
			}
			set{
				entitetPosle = value;
			}
		}

		public EntitetSistema EntitetPre{
			get{
				return entitetPre;
			}
			set{
				entitetPre = value;
			}
		}

		public override void Execute(){
			this.Update(this.entitetPosle);
		}

		public override void Unexecute(){
			this.Update(this.entitetPre);
		}

		/// 
		/// <param name="noviEntiteti"></param>
		public override void Update(EntitetSistema noviEntiteti){
            using (var db = AteljeDB.Instance())
            {
				var currAt = db.Ateljes.Where(x => x.Id == ((Atelje)noviEntiteti).Id);

				if(currAt.Count() != 0)
                {
					IDBConvert convert = new DBConvertAtelje();

					db.Ateljes.Remove(currAt.First());
					db.Ateljes.Add((DBAccess.Atelje)convert.ConvertToDBModel(noviEntiteti));
                }
            }
		}

	}//end DBCRUDAteljeUpdate

}//end namespace Atelje