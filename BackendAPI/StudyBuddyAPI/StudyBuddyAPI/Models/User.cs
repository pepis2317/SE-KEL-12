using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StudyBuddyAPI.Models
{
    [Table("msUsers")]
    public class User
    {
        [Required]
        [Key]
        [StringLength(5)]
        public string id { get; set; }
        [Required]
        [StringLength(50)]
        public string username { get; set; }
        [Required]
        [StringLength(50)]
        public string pass { get; set; }
        [Required]
        [StringLength(50)]
        public string email { get; set; }
        public double rating { get; set; }
        [StringLength(100)]
        public string studysubject { get; set; }
        [StringLength(50)]
        public string about { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public int ratings { get; set; }


    }
}
