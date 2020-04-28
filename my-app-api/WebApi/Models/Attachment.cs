using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Attachment
    {
        public int AttachmentId { get; set; }

        public string Title { get; set; }

        public byte[] BlobContent { get; set; }

        public string Extension { get; set; }
    }
}