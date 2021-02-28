using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SongWebAPI.Models
{
    /// <summary>
    /// This class is for Song Model
    /// </summary>
    public class Song
    {
        // Primary Key of Song
        [Key]
        public int SongID { get; set; }

        // Title of song
        [Required]
        [StringLength(200)]
        public string SongTitle { get; set; }

        // singer Name
        [Required]
        [StringLength(200)]
        public string Singer { get; set; }

        // Lyricist
        [Required]
        [StringLength(200)]
        public string Lyricist { get; set; }

        // Release Date
        [Required]
        [StringLength(200)]
        public string ReleaseDate { get; set; }
    }
}
