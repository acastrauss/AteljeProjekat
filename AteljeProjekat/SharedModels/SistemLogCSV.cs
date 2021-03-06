///////////////////////////////////////////////////////////
//  SistemLogCSV.cs
//  Implementation of the Class SistemLogCSV
//  Generated by Enterprise Architect
//  Created on:      02-Oct-2021 5:00:55 PM
//  Original author: acast
///////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;
using System.IO;



using Atelje;
using System.Web;

namespace Atelje {
	public class SistemLogCSV : ISistemLog {

		public SistemLogCSV(){

		}

		~SistemLogCSV(){

		}

		/// 
		/// <param name="log"></param>
		public void UpisiLog(LogPodatak log){
			var logDir = Directory.GetCurrentDirectory();

			var pathLog = Path.Combine(logDir, "SistemLog", "SistemLog.csv");

			var csv = String.Format("{0},{1},{2}\n",
				log.Vreme.ToString(), Enum.GetName(typeof(LogTip), log.Tip), log.Poruka);

			File.AppendAllText(pathLog, csv);
		}

	}//end SistemLogCSV

}//end namespace Atelje