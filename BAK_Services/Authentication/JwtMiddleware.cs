using System;
using System.Collections.Generic;
using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace BAK_Services.Authentication
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly UserManager<User> _userManager;

        private const string UserIdClaimIdentificator = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid";

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, UserManager<User> userManager, IConfiguration configuration)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                await attachUserToContext(context, token, userManager, configuration);

            await _next(context);
        }

        private async Task attachUserToContext(HttpContext context, string token, UserManager<User> userManager, IConfiguration configuration)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("AuthenticationSecret"));
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken) validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == UserIdClaimIdentificator).Value;

                var user = await userManager.FindByIdAsync(userId);
                context.Items["User"] = user;
                context.Items["Roles"] = await userManager.GetRolesAsync(user);
            }
            catch
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}
