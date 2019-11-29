using System;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using myapi.Models;
using myapi.repo;

namespace mypos_api.Controllers
{

    [ApiController]
    [Route("[controller]")] // localhost.../auth/login && localhost.../auth/register
    public class AuthController : ControllerBase
    {

        ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger, IAuthRepo authRepo, IMapper mapper)
        {
            _logger = logger;
            _authRepo = authRepo;
            _mapper = mapper;
        }

        public IAuthRepo _authRepo { get; }
        public IMapper _mapper { get; }

        [HttpPost("login")]  // Post([FromBody] modelType model) => JSON
        public IActionResult Login(UsersViewModel usersViewModel)   // JSON
        {
            try
            {
                Users user = _mapper.Map<Users>(usersViewModel);
                (Users result, string token) = _authRepo.Login(user);
                if (result == null) {
                    return Unauthorized(new { token = String.Empty, message = "Username Invalid" }); // 401
                }

                if (String.IsNullOrEmpty(token)) {
                    return Unauthorized(new { token = String.Empty, message = "Password Invalid" }); // 401
                }
                //  Anunymous Object
                return Ok(new { token = token, message = "Login Successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Login failure: {ex}");
                // return BadRequest();
                return StatusCode(500, new { token = String.Empty, message = ex });
            }
        }

        [HttpPost("[action]")]  // Post([FromBody] modelType model) => JSON
        public IActionResult Register(Users user)   // JSON
        {
            try
            {
                _authRepo.Register(user);
                return Ok(new { result = "OK", message = "Register Successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Register failure: {ex}");
                return BadRequest(new { token = "nok", message = "Register Failure" });
            }
        }
    }
}