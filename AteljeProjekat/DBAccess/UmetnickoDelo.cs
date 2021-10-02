namespace DBAccess
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UmetnickoDelo")]
    public partial class UmetnickoDelo : DBEntity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Naziv { get; set; }

        public int Pravac { get; set; }

        public int Stil { get; set; }

        public int AutorId { get; set; }

        public int AteljeId { get; set; }

        public virtual Atelje Atelje { get; set; }

        public virtual Autor Autor { get; set; }
    }
}
