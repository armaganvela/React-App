namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class x3 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Attachments",
                c => new
                    {
                        AttachmentId = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        BlobContent = c.Binary(),
                        Extension = c.String(),
                    })
                .PrimaryKey(t => t.AttachmentId);
            
            AddColumn("dbo.Camps", "AttachmentId", c => c.Int());
            AddColumn("dbo.Speakers", "AttachmentId", c => c.Int());
            CreateIndex("dbo.Camps", "AttachmentId");
            CreateIndex("dbo.Speakers", "AttachmentId");
            AddForeignKey("dbo.Camps", "AttachmentId", "dbo.Attachments", "AttachmentId");
            AddForeignKey("dbo.Speakers", "AttachmentId", "dbo.Attachments", "AttachmentId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Speakers", "AttachmentId", "dbo.Attachments");
            DropForeignKey("dbo.Camps", "AttachmentId", "dbo.Attachments");
            DropIndex("dbo.Speakers", new[] { "AttachmentId" });
            DropIndex("dbo.Camps", new[] { "AttachmentId" });
            DropColumn("dbo.Speakers", "AttachmentId");
            DropColumn("dbo.Camps", "AttachmentId");
            DropTable("dbo.Attachments");
        }
    }
}
