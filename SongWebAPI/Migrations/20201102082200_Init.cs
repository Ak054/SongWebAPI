using Microsoft.EntityFrameworkCore.Migrations;
using System.IO;

namespace SongWebAPI.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    SongID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SongTitle = table.Column<string>(maxLength: 200, nullable: false),
                    Singer = table.Column<string>(maxLength: 200, nullable: false),
                    Lyricist = table.Column<string>(maxLength: 200, nullable: false),
                    ReleaseDate = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.SongID);
                });

            var sqlFile = Path.Combine(".\\Data", @"Songs.sql");
            migrationBuilder.Sql(File.ReadAllText(sqlFile));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Songs");
        }
    }
}
