///////////////////////////////////////////////////////////
//  KorisnikFactory.cs
//  Implementation of the Class KorisnikFactory
//  Generated by Enterprise Architect
//  Created on:      03-Oct-2021 10:37:01 PM
//  Original author: acast
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using Atelje;
namespace Atelje {
	public class KorisnikFactory : EntitetFactory {

		public KorisnikFactory(){

		}

		~KorisnikFactory(){

		}

		public override EntitetSistema MakeEntitet(){

			return new KorisnikSistema();
		}

	}//end KorisnikFactory

}//end namespace Atelje