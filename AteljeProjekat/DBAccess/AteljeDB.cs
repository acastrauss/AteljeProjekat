using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace DBAccess
{
    public partial class AteljeDB : DbContext
    {
        public AteljeDB()
            : base("name=AteljeDB")
        {
        }

        private static AteljeDB instance;

        public static AteljeDB Instance()
        {
            if (instance == null)
                instance = new AteljeDB();

            return instance;
        }

        public virtual DbSet<Atelje> Ateljes { get; set; }
        public virtual DbSet<Autor> Autors { get; set; }
        public virtual DbSet<KorisnikSistema> KorisnikSistemas { get; set; }
        public virtual DbSet<UmetnickoDelo> UmetnickoDeloes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Atelje>()
                .Property(e => e.Adresa)
                .IsFixedLength();

            modelBuilder.Entity<Atelje>()
                .Property(e => e.MBR)
                .IsFixedLength();

            modelBuilder.Entity<Atelje>()
                .Property(e => e.PIB)
                .IsFixedLength();

            modelBuilder.Entity<Atelje>()
                .HasMany(e => e.UmetnickoDeloes)
                .WithRequired(e => e.Atelje)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Autor>()
                .Property(e => e.Ime)
                .IsFixedLength();

            modelBuilder.Entity<Autor>()
                .Property(e => e.Prezime)
                .IsFixedLength();

            modelBuilder.Entity<Autor>()
                .HasMany(e => e.UmetnickoDeloes)
                .WithRequired(e => e.Autor)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<KorisnikSistema>()
                .Property(e => e.Email)
                .IsFixedLength();

            modelBuilder.Entity<KorisnikSistema>()
                .Property(e => e.Ime)
                .IsFixedLength();

            modelBuilder.Entity<KorisnikSistema>()
                .Property(e => e.Prezime)
                .IsFixedLength();

            modelBuilder.Entity<KorisnikSistema>()
                .Property(e => e.KorisnickoIme)
                .IsFixedLength();

            modelBuilder.Entity<KorisnikSistema>()
                .Property(e => e.LozinkaHash)
                .IsFixedLength();

            modelBuilder.Entity<UmetnickoDelo>()
                .Property(e => e.Naziv)
                .IsFixedLength();
        }
    }
}
