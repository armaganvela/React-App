namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class x3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Camps", "EventDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Camps", "EventDate", c => c.DateTime(nullable: false));
        }
    }
}
