using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAK_Services.Migrations
{
    public partial class addworkspacecolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseExecutions_AspNetUsers_UserId",
                table: "CourseExecutions");

            migrationBuilder.DropTable(
                name: "TaskExecutionTests");

            migrationBuilder.DropTable(
                name: "Tests");
            
            migrationBuilder.AddColumn<string>(
                name: "ExecutionWorkspace",
                table: "TaskExecutions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "CourseExecutions",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseExecutions_AspNetUsers_UserId",
                table: "CourseExecutions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseExecutions_AspNetUsers_UserId",
                table: "CourseExecutions");

            migrationBuilder.DropColumn(
                name: "ExecutionWorkspace",
                table: "TaskExecutions");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "CourseExecutions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TempId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddUniqueConstraint(
                name: "AK_AspNetUsers_TempId",
                table: "AspNetUsers",
                column: "TempId");

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConcurrencyToken = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TestCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tests_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskExecutionTests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Completed = table.Column<bool>(type: "bit", nullable: false),
                    ConcurrencyToken = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TaskExecutionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskExecutionTests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskExecutionTests_TaskExecutions_TaskExecutionId",
                        column: x => x.TaskExecutionId,
                        principalTable: "TaskExecutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskExecutionTests_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskExecutionTests_TaskExecutionId",
                table: "TaskExecutionTests",
                column: "TaskExecutionId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskExecutionTests_TestId",
                table: "TaskExecutionTests",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_TaskId",
                table: "Tests",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseExecutions_AspNetUsers_UserId",
                table: "CourseExecutions",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "TempId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
