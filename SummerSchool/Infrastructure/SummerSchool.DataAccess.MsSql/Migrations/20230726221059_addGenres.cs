using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SummerSchool.DataAccess.MsSql.Migrations
{
    /// <inheritdoc />
    public partial class addGenres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Genres");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Genres");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Books");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Genres",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Genres",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
