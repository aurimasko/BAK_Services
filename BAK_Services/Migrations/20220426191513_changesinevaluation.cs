using Microsoft.EntityFrameworkCore.Migrations;

namespace BAK_Services.Migrations
{
    public partial class changesinevaluation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MinimumTestsCompletedToSuccess",
                table: "Tasks",
                newName: "MinimumPointsCompletedToSuccess");

            migrationBuilder.AddColumn<int>(
                name: "MaximumPointsToGet",
                table: "Tasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<bool>(
                name: "Successful",
                table: "TaskExecutions",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<int>(
                name: "Mark",
                table: "TaskExecutions",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Successful",
                table: "CourseExecutions",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaximumPointsToGet",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Mark",
                table: "TaskExecutions");

            migrationBuilder.RenameColumn(
                name: "MinimumPointsCompletedToSuccess",
                table: "Tasks",
                newName: "MinimumTestsCompletedToSuccess");

            migrationBuilder.AlterColumn<bool>(
                name: "Successful",
                table: "TaskExecutions",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Successful",
                table: "CourseExecutions",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }
    }
}
