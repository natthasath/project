using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using myapi.Database;
using myapi.Models;

namespace myapi.repo
{
    public class AuthRepo : IAuthRepo
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public AuthRepo(DatabaseContext context, IConfiguration Configuration)
        {
            this._context = context;
            _configuration = Configuration;
        }

        public (Users, string) Login(Users user)
        {
            var result = _context.Users.SingleOrDefault(u => u.Username == user.Username);
            if (result == null)
            {
                return (null, String.Empty);
            }
            if (!CheckPassword(result.Password, user.Password))
            {
                return (result, String.Empty);
            }
            return (result, BuildToken(result));
        }

        private string BuildToken(Users user)
        {
            // key is case-sensitive
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim("position", user.Position),
                new Claim(ClaimTypes.Role, user.Position)
            };

            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:ExpireDay"]));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool CheckPassword(string hash, string password)
        {
            var parts = hash.Split('.', 2);

            if (parts.Length != 2)
            {
                return false;
            }

            var salt = Convert.FromBase64String(parts[0]);
            var passwordHash = parts[1];

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return passwordHash == hashed;
        }

        public void Register(Users user)
        {
            user.Password = HashPassword(user.Password);
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        private string HashPassword(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return $"{Convert.ToBase64String(salt)}.{hashed}";
        }
    }
}