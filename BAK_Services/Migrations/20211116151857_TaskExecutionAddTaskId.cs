using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAK_Services.Migrations
{
    public partial class TaskExecutionAddTaskId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TaskId",
                table: "TaskExecution",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TaskExecution_TaskId",
                table: "TaskExecution",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskExecution_Tasks_TaskId",
                table: "TaskExecution",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskExecution_Tasks_TaskId",
                table: "TaskExecution");

            migrationBuilder.DropIndex(
                name: "IX_TaskExecution_TaskId",
                table: "TaskExecution");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "TaskExecution");
        }
    }
}
