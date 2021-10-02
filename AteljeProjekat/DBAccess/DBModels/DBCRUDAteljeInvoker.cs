///////////////////////////////////////////////////////////
//  DBCRUDAteljeInvoker.cs
//  Implementation of the Class DBCRUDAteljeInvoker
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
	public class DBCRUDAteljeInvoker {

		private List<DBCRUDAteljeCommand> komande;
		private int cntComm = 0;

		public void AddComand(DBCRUDAteljeCommand command)
        {
            try
            {
				komande.RemoveRange(++cntComm, komande.Count - cntComm);
				komande.Add(command);
			}
			catch (Exception)
            {
				return;
            }
		}

		public DBCRUDAteljeInvoker(){
			komande = new List<DBCRUDAteljeCommand>();
		}

		~DBCRUDAteljeInvoker(){

		}

		public void ExecuteLast(){
			komande[cntComm].Execute();
		}

		public void Redo(){
			if(cntComm + 1 < komande.Count)
				komande[cntComm++].Execute();
		}

		public void Undo(){
			if(cntComm > 0)
				komande[cntComm--].Unexecute();
		}

	}//end DBCRUDAteljeInvoker

}//end namespace Atelje