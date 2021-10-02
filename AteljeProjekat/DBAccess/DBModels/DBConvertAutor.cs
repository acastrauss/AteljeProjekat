///////////////////////////////////////////////////////////
//  DBConvertAutor.cs
//  Implementation of the Class DBConvertAutor
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
namespace Atelje {
	public class DBConvertAutor : IDBConvert {

		public DBConvertAutor(){

		}

		~DBConvertAutor(){

		}

		/// 
		/// <param name="webModel"></param>
		public DBEntity ConvertToDBModel(EntitetSistema webModel){
            try
            {
				var autor = (Autor)webModel;

				var dela = new List<DBAccess.UmetnickoDelo>();
				IDBConvert convert = new DBConvertUmetnickoDelo();

                foreach (var d in autor.m_UmetnickoDelo)
                {
					var delo = (DBAccess.UmetnickoDelo)convert.ConvertToDBModel(d);

					dela.Add(delo);
                }

				return new DBAccess.Autor()
				{
					GodinaRodjenja = autor.GodinaRodjenja,
					GodinaSmrti = autor.GodinaSmrti,
					Id = autor.Id,
					Ime = autor.Ime,
					Prezime = autor.Prezime,
					UmetnickiPravac = (int)autor.UmetnickiPravac,
					UmetnickoDeloes = dela
				};
            }
            catch (Exception)
            {
				return null;
            }
		}

		/// 
		/// <param name="dbModel"></param>
		public EntitetSistema ConvertToWebModel(DBEntity dbModel){
            try
            {
				var autor = (DBAccess.Autor)dbModel;
				var dela = new List<UmetnickoDelo>();
				IDBConvert conv = new DBConvertUmetnickoDelo();

                foreach (var d in autor.UmetnickoDeloes)
                {
					dela.Add((UmetnickoDelo)conv.ConvertToWebModel(d));
                }

				return new Autor()
				{
					GodinaRodjenja = autor.GodinaRodjenja,
					GodinaSmrti = autor.GodinaSmrti,
					Id = autor.Id,
					Ime = autor.Ime,
					Prezime = autor.Prezime,
					m_UmetnickoDelo = dela,
					UmetnickiPravac = (UmetnickiPravac)autor.UmetnickiPravac
				};
            }
            catch (Exception)
            {
				return null;
            }
		}

	}//end DBConvertAutor

}//end namespace Atelje