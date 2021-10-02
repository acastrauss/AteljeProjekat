namespace DBAccess
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Autor")]
    public partial class Autor : DBEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Autor()
        {
            UmetnickoDeloes = new HashSet<UmetnickoDelo>();
        }

        public int Id { get; set; }

        [Column(TypeName = "date")]
        public DateTime GodinaRodjenja { get; set; }

        [Column(TypeName = "date")]
        public DateTime? GodinaSmrti { get; set; }

        [Required]
        [StringLength(50)]
        public string Ime { get; set; }

        [Required]
        [StringLength(50)]
        public string Prezime { get; set; }

        public int UmetnickiPravac { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UmetnickoDelo> UmetnickoDeloes { get; set; }
    }
}
