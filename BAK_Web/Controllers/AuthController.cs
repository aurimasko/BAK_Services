using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BAK_Services.Authentication;
using BAK_Services.Models;
using BAK_Web.Attributes;
using BAK_Web.Mappers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BAK_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [ApiAuthorize]
        [HttpGet]
        [Route("auth")]
        public IActionResult Auth()
        {
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Sid, user.Id)
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AuthenticationSecret")));

                var token = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("AuthenticationIssuer"), 
                    audience: _configuration.GetValue<string>("AuthenticationAudience"),
                    expires: DateTime.UtcNow.AddHours(2),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    id = user.Id,
                    roles = userRoles
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);

            if (userExists != null)
                return BadRequest(new Response
                {
                    IsSuccess = false,
                    ErrorMessages = new List<string> {"User already exists!"}
                });

            var user = new User
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new Response
                {
                    IsSuccess = false,
                    ErrorMessages = IdentityErrorMapper.MapIdentityErrorsToErrorMessages(result.Errors).ToList()
                });
            }

            foreach (var role in (Role[])Enum.GetValues(typeof(Role)))
            {
                if (!await _roleManager.RoleExistsAsync(role.ToString()))
                    await _roleManager.CreateAsync(new IdentityRole(role.ToString()));
            }

            await _userManager.AddToRoleAsync(user, Role.Student.ToString());

            return Ok(new Response { IsSuccess = true  });
        }

    }
}
