using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SummerSchool.DataAccess.MsSql.Migrations
{
    /// <inheritdoc />
    public partial class addedGenreName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Genres",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Genres");
        }
    }
}
