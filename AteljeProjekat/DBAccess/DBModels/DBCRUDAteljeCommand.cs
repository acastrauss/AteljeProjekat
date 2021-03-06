///////////////////////////////////////////////////////////
//  DBCRUDAteljeCommand.cs
//  Implementation of the Class DBCRUDAteljeCommand
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 4:44:26 PM
//  Original author: acast
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using Atelje;
namespace Atelje {
	
	public enum COMMAND_TYPE { CREATE, READ, UPDATE, DELETE};
	
	public class DBCRUDAteljeCommand : DBCRUD {

		public COMMAND_TYPE CommandType { get; set; } 

		public DBCRUDAteljeCommand(){

		}

		~DBCRUDAteljeCommand(){

		}

		public virtual void Execute(){

		}

		public virtual void Unexecute(){

		}

	}//end DBCRUDAteljeCommand

}//end namespace Atelje