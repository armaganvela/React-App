namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class x2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Camps", "CountryId", c => c.Int());
            CreateIndex("dbo.Camps", "CountryId");
            AddForeignKey("dbo.Camps", "CountryId", "dbo.Countries", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Camps", "CountryId", "dbo.Countries");
            DropIndex("dbo.Camps", new[] { "CountryId" });
            DropColumn("dbo.Camps", "CountryId");
            DropTable("dbo.Countries");
        }
    }
}
