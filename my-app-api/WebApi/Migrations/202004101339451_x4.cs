namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class x4 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Talks",
                c => new
                    {
                        TalkId = c.Int(nullable: false, identity: true),
                        CampId = c.Int(nullable: false),
                        SpeakerId = c.Int(nullable: false),
                        Title = c.String(),
                        Abstract = c.String(),
                        Level = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TalkId)
                .ForeignKey("dbo.Camps", t => t.CampId, cascadeDelete: true)
                .ForeignKey("dbo.Speakers", t => t.SpeakerId, cascadeDelete: true)
                .Index(t => t.CampId)
                .Index(t => t.SpeakerId);
            
            CreateTable(
                "dbo.Speakers",
                c => new
                    {
                        SpeakerId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        MiddleName = c.String(),
                        Company = c.String(),
                    })
                .PrimaryKey(t => t.SpeakerId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Talks", "SpeakerId", "dbo.Speakers");
            DropForeignKey("dbo.Talks", "CampId", "dbo.Camps");
            DropIndex("dbo.Talks", new[] { "SpeakerId" });
            DropIndex("dbo.Talks", new[] { "CampId" });
            DropTable("dbo.Speakers");
            DropTable("dbo.Talks");
        }
    }
}
