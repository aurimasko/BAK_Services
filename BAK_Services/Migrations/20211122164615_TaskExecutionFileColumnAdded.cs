using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAK_Services.Migrations
{
    public partial class TaskExecutionFileColumnAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodeFileId",
                table: "TaskExecution");

            migrationBuilder.RenameColumn(
                name: "RowVersion",
                table: "Users",
                newName: "ConcurrencyToken");

            migrationBuilder.RenameColumn(
                name: "RowVersion",
                table: "Tests",
                newName: "ConcurrencyToken");

            migrationBuilder.RenameColumn(
                name: "RowVersion",
                table: "Tasks",
                newName: "ConcurrencyToken");

            migrationBuilder.RenameColumn(
                name: "RowVersion",
                table: "TaskExecution",
                newName: "ConcurrencyToken");

            migrationBuilder.RenameColumn(
                name: "RowVersion",
                table: "Courses",
                newName: "ConcurrencyToken");

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "Tests",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<byte[]>(
                name: "ExecutionFile",
                table: "TaskExecution",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "TaskExecution",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "Courses",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Modified",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Modified",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "Modified",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "ExecutionFile",
                table: "TaskExecution");

            migrationBuilder.DropColumn(
                name: "Modified",
                table: "TaskExecution");

            migrationBuilder.DropColumn(
                name: "Modified",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "ConcurrencyToken",
                table: "Users",
                newName: "RowVersion");

            migrationBuilder.RenameColumn(
                name: "ConcurrencyToken",
                table: "Tests",
                newName: "RowVersion");

            migrationBuilder.RenameColumn(
                name: "ConcurrencyToken",
                table: "Tasks",
                newName: "RowVersion");

            migrationBuilder.RenameColumn(
                name: "ConcurrencyToken",
                table: "TaskExecution",
                newName: "RowVersion");

            migrationBuilder.RenameColumn(
                name: "ConcurrencyToken",
                table: "Courses",
                newName: "RowVersion");

            migrationBuilder.AddColumn<Guid>(
                name: "CodeFileId",
                table: "TaskExecution",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
