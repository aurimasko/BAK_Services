using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAK_Services.Migrations
{
    public partial class TaskExecutionsTests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskExecution_CourseExecution_CourseExecutionId",
                table: "TaskExecution");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskExecution_Tasks_TaskId",
                table: "TaskExecution");

            migrationBuilder.DropTable(
                name: "TaskExecutionTest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskExecution",
                table: "TaskExecution");

            migrationBuilder.RenameTable(
                name: "TaskExecution",
                newName: "TaskExecutions");

            migrationBuilder.RenameIndex(
                name: "IX_TaskExecution_TaskId",
                table: "TaskExecutions",
                newName: "IX_TaskExecutions_TaskId");

            migrationBuilder.RenameIndex(
                name: "IX_TaskExecution_CourseExecutionId",
                table: "TaskExecutions",
                newName: "IX_TaskExecutions_CourseExecutionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskExecutions",
                table: "TaskExecutions",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "TaskExecutionTests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskExecutionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Completed = table.Column<bool>(type: "bit", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ConcurrencyToken = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
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

            migrationBuilder.AddForeignKey(
                name: "FK_TaskExecutions_CourseExecution_CourseExecutionId",
                table: "TaskExecutions",
                column: "CourseExecutionId",
                principalTable: "CourseExecution",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskExecutions_Tasks_TaskId",
                table: "TaskExecutions",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskExecutions_CourseExecution_CourseExecutionId",
                table: "TaskExecutions");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskExecutions_Tasks_TaskId",
                table: "TaskExecutions");

            migrationBuilder.DropTable(
                name: "TaskExecutionTests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskExecutions",
                table: "TaskExecutions");

            migrationBuilder.RenameTable(
                name: "TaskExecutions",
                newName: "TaskExecution");

            migrationBuilder.RenameIndex(
                name: "IX_TaskExecutions_TaskId",
                table: "TaskExecution",
                newName: "IX_TaskExecution_TaskId");

            migrationBuilder.RenameIndex(
                name: "IX_TaskExecutions_CourseExecutionId",
                table: "TaskExecution",
                newName: "IX_TaskExecution_CourseExecutionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskExecution",
                table: "TaskExecution",
                column: "Id");

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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskExecutionTest_Tests_TestsId",
                        column: x => x.TestsId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskExecutionTest_TestsId",
                table: "TaskExecutionTest",
                column: "TestsId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskExecution_CourseExecution_CourseExecutionId",
                table: "TaskExecution",
                column: "CourseExecutionId",
                principalTable: "CourseExecution",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskExecution_Tasks_TaskId",
                table: "TaskExecution",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
