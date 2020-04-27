namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class x2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Camps", "Latitude", c => c.String());
            AddColumn("dbo.Camps", "Longitude", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Camps", "Longitude");
            DropColumn("dbo.Camps", "Latitude");
        }
    }
}
