using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atelje
{
    public class Initialize
    {
        private Atelje atelje;
        private Autor autor;
        private UmetnickoDelo umetnickoDelo;
        private KorisnikSistema korisnik;

        public Initialize()
        {
            var ateljeFac = new AteljeFactory();
            var initA = (Atelje)ateljeFac.MakeEntitet();
            initA.Adresa = "Nikole Pasica 15";
            initA.Mmbr = new char[6] { '1', '1', '1', '1', '1', '1' };
            initA.Pib = new char[6] { '1', '1', '1', '1', '1', '1' };
            initA.UmetnickaDela = new List<UmetnickoDelo>();
            initA.Id = 1;

            var autorFac = new AutorFactory();
            var initAutor = (Autor)autorFac.MakeEntitet();
            initAutor.GodinaRodjenja = new DateTime(1881, 10, 25);
            initAutor.GodinaSmrti = new DateTime(1973, 4, 8);
            initAutor.Ime = "Pablo";
            initAutor.Prezime = "Pikaso";
            initAutor.UmetnickaDela = new List<UmetnickoDelo>();
            initAutor.UmetnickiPravac = UmetnickiPravac.Kubizam;
            initAutor.Id = 1;

            var udFac = new UmetnickoDeloFactory();
            var initUd = (UmetnickoDelo)udFac.MakeEntitet();
            initUd.Naziv = "Autoportret";
            initUd.Pravac = UmetnickiPravac.Kubizam;
            initUd.Stil = Stil.Portret;
            initUd.IdAtelje = initA.Id;
            initUd.IdUmetnik = initAutor.Id;

            //initAutor.UmetnickaDela.Add(initUd);
            //initA.UmetnickaDela.Add(initUd);

            var korisnikFac = new KorisnikFactory();
            var initK = (KorisnikSistema)korisnikFac.MakeEntitet();
            initK.Email = "admin@admin.com";
            initK.Ime = "Admin";
            initK.Prezime = "Admin";
            initK.KorisnickoIme = "admin";
            initK.LozinkaHash = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
            initK.TipKorisnika = TipKorisnika.ADMIN;

            atelje = initA;
            autor = initAutor;
            umetnickoDelo = initUd;
            korisnik = initK;
        }

        public void DoInit()
        {
            DBCRUDAteljeExists ateljeExists = new DBCRUDAteljeExists();
            ateljeExists.AteljeEntity = this.atelje;
            ateljeExists.Execute();

            if (!ateljeExists.DoesExists)
            {
                DBCRUDAteljeCreate ateljeCreate = new DBCRUDAteljeCreate();
                ateljeCreate.entiet = this.atelje;
                ateljeCreate.Execute();
                this.umetnickoDelo.IdAtelje = ((Atelje)ateljeCreate.entiet).Id;
            }
            else
            {
                this.umetnickoDelo.IdAtelje = ((Atelje)ateljeExists.AteljeEntity).Id;
            }

            DBCRUDUmetnik umetnikDB = new DBCRUDUmetnik();
            var existing = umetnikDB.Exists(this.autor);

            if (existing == null)
            {
                umetnikDB.Create(autor);
                this.umetnickoDelo.IdUmetnik = umetnikDB.CreatedId;
            }
            else
            {
                this.umetnickoDelo.IdUmetnik = existing.Id;
            }

            DBCRUDUmetnickoDelo udDB = new DBCRUDUmetnickoDelo();

            if (!udDB.Exists(this.umetnickoDelo))
            {
                udDB.Create(this.umetnickoDelo);
            }

            DBCRUDKorisnik korisnikDB = new DBCRUDKorisnik();

            if(korisnikDB.KorisnikId(this.korisnik.KorisnickoIme, this.korisnik.LozinkaHash).Id == -1)
            {
                korisnikDB.Create(korisnik);
            }
        }
    }
}
