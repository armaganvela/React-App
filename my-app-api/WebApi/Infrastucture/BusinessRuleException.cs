using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Infrastucture
{
    public class BusinessRuleException : Exception
    {
        public string RuleName { get; private set; }

        public string EntityName { get; private set; }

        public BusinessRuleException() { }

        public BusinessRuleException(string message) : base(message) { }
    }
}