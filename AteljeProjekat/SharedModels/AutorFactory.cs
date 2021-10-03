///////////////////////////////////////////////////////////
//  AutorFactory.cs
//  Implementation of the Class AutorFactory
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
	public class AutorFactory : EntitetFactory {

		public AutorFactory(){

		}

		~AutorFactory(){

		}

		public override EntitetSistema MakeEntitet(){

			return new Autor();
		}

	}//end AutorFactory

}//end namespace Atelje