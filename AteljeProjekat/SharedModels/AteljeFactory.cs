///////////////////////////////////////////////////////////
//  AteljeFactory.cs
//  Implementation of the Class AteljeFactory
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 5:00:53 PM
//  Original author: acast
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using Atelje;
namespace Atelje {
	public class AteljeFactory : EntitetFactory {

		public AteljeFactory(){

		}

		~AteljeFactory(){

		}

		public override EntitetSistema MakeEntitet(){

			return new Atelje();
		}

	}//end AteljeFactory

}//end namespace Atelje