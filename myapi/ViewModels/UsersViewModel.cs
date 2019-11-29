using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace myapi.Models
{
    public partial class UsersViewModel
    {
        [Required]
        public string Username { get; set; }
        // Validation Password
        [MinLength(8, ErrorMessage = "password min length = 8")]
        [MaxLength(30)]
        public string Password { get; set; }
    }
}
