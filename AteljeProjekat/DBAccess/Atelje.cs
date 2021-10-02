namespace DBAccess
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Atelje")]
    public partial class Atelje : DBEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Atelje()
        {
            UmetnickoDeloes = new HashSet<UmetnickoDelo>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Adresa { get; set; }

        [Required]
        [StringLength(50)]
        public string MBR { get; set; }

        [Required]
        [StringLength(50)]
        public string PIB { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UmetnickoDelo> UmetnickoDeloes { get; set; }
    }
}
