using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAK_Services.Migrations
{
    public partial class TaskExecutionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskExecution",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CodeFileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskExecution", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaskExecutionTest",
                columns: table => new
                {
                    TaskExecutionsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TestsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskExecutionTest", x => new { x.TaskExecutionsId, x.TestsId });
                    table.ForeignKey(
                        name: "FK_TaskExecutionTest_TaskExecution_TaskExecutionsId",
                        column: x => x.TaskExecutionsId,
                        principalTable: "TaskExecution",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_TaskExecutionTest_Tests_TestsId",
                        column: x => x.TestsId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskExecutionTest_TestsId",
                table: "TaskExecutionTest",
                column: "TestsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskExecutionTest");

            migrationBuilder.DropTable(
                name: "TaskExecution");
        }
    }
}
