///////////////////////////////////////////////////////////
//  DBConvertAtelje.cs
//  Implementation of the Class DBConvertAtelje
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 4:44:23 PM
//  Original author: acast
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using DBAccess;

namespace Atelje {
	public class DBConvertAtelje : IDBConvert {

		public DBConvertAtelje(){

		}

		~DBConvertAtelje(){

		}

        public EntitetSistema ConvertToWebModel(DBEntity dbModel)
        {
            try
            {
                var ateljeDB = (DBAccess.Atelje)dbModel;

                var dela = new List<UmetnickoDelo>();

                IDBConvert conv = new DBConvertUmetnickoDelo();

                foreach (var d in ateljeDB.UmetnickoDeloes)
                {
                    dela.Add((UmetnickoDelo)conv.ConvertToWebModel(d));
                }

                return new Atelje()
                {
                    Adresa = ateljeDB.Adresa.Trim(),
                    Mmbr = ateljeDB.MBR.Trim().ToCharArray(),
                    Pib = ateljeDB.PIB.Trim().ToCharArray(),
                    UmetnickaDela = dela,
                    Id = ateljeDB.Id
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DBEntity ConvertToDBModel(EntitetSistema webModel)
        {
            try
            {
                var atelje = (Atelje)webModel;

                var dela = new List<DBAccess.UmetnickoDelo>();
                
                IDBConvert conv = new DBConvertUmetnickoDelo();

                foreach (var d in atelje.UmetnickaDela)
                {
                    var delo = (DBAccess.UmetnickoDelo)conv.ConvertToDBModel(d);
                    dela.Add(delo);
                }

                return new DBAccess.Atelje()
                {
                    Adresa = atelje.Adresa,
                    Id = atelje.Id,
                    MBR = new string(atelje.Mmbr),
                    PIB = new string(atelje.Pib),
                    UmetnickoDeloes = dela
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
    }//end DBConvertAtelje

}//end namespace Atelje