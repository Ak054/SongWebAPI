using SongWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SongWebAPI.Data
{
    public class SongsDBContext : DbContext
    {
        public SongsDBContext(DbContextOptions<SongsDBContext> options) : base(options)
        {

        }

        public DbSet<Song> Songs { get; set; }
    }
}