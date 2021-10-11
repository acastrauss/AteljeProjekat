using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atelje
{
    public class DBCRUDAteljeExists : DBCRUDAteljeCommand
    {

        public EntitetSistema AteljeEntity { get; set; }
        public bool DoesExists { get; set; }

        public void Exists(Atelje atelje)
        {
            DBAccess.AteljeDB db;
            DoesExists = false;

            lock (db = DBAccess.AteljeDB.Instance())
            {
                konverzija = new DBConvertAtelje();
                var aNew = (DBAccess.Atelje)konverzija.ConvertToDBModel(atelje);

                var find = db.Ateljes.Where(x =>
                    x.Adresa == (aNew.Adresa) &&
                    x.MBR == (aNew.MBR) &&
                    x.PIB == (aNew.PIB)
                    );

                if (find.Count() > 0)
                {
                    DoesExists = true;
                    AteljeEntity = konverzija.ConvertToWebModel(find.First());
                }
            }
        }

        public override void Execute()
        {
            this.Exists((Atelje)AteljeEntity);
        }

    }
}
