using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BAK_Services.Migrations
{
    public partial class CourseExecutions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseExecution_Courses_CourseId",
                table: "CourseExecution");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseExecution_Users_UserId",
                table: "CourseExecution");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskExecutions_CourseExecution_CourseExecutionId",
                table: "TaskExecutions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseExecution",
                table: "CourseExecution");

            migrationBuilder.DropColumn(
                name: "ExecutionFile",
                table: "TaskExecutions");

            migrationBuilder.RenameTable(
                name: "CourseExecution",
                newName: "CourseExecutions");

            migrationBuilder.RenameIndex(
                name: "IX_CourseExecution_UserId",
                table: "CourseExecutions",
                newName: "IX_CourseExecutions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseExecution_CourseId",
                table: "CourseExecutions",
                newName: "IX_CourseExecutions_CourseId");

            migrationBuilder.AddColumn<string>(
                name: "ExecutionCode",
                table: "TaskExecutions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseExecutions",
                table: "CourseExecutions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseExecutions_Courses_CourseId",
                table: "CourseExecutions",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseExecutions_Users_UserId",
                table: "CourseExecutions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskExecutions_CourseExecutions_CourseExecutionId",
                table: "TaskExecutions",
                column: "CourseExecutionId",
                principalTable: "CourseExecutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseExecutions_Courses_CourseId",
                table: "CourseExecutions");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseExecutions_Users_UserId",
                table: "CourseExecutions");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskExecutions_CourseExecutions_CourseExecutionId",
                table: "TaskExecutions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseExecutions",
                table: "CourseExecutions");

            migrationBuilder.DropColumn(
                name: "ExecutionCode",
                table: "TaskExecutions");

            migrationBuilder.RenameTable(
                name: "CourseExecutions",
                newName: "CourseExecution");

            migrationBuilder.RenameIndex(
                name: "IX_CourseExecutions_UserId",
                table: "CourseExecution",
                newName: "IX_CourseExecution_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseExecutions_CourseId",
                table: "CourseExecution",
                newName: "IX_CourseExecution_CourseId");

            migrationBuilder.AddColumn<byte[]>(
                name: "ExecutionFile",
                table: "TaskExecutions",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseExecution",
                table: "CourseExecution",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseExecution_Courses_CourseId",
                table: "CourseExecution",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseExecution_Users_UserId",
                table: "CourseExecution",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskExecutions_CourseExecution_CourseExecutionId",
                table: "TaskExecutions",
                column: "CourseExecutionId",
                principalTable: "CourseExecution",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
