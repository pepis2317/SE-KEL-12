using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddyAPI.Data;
using StudyBuddyAPI.Models;

namespace StudyBuddyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<User> Get()
        {
            var userList = _context.users.Select(x => new User
            {
                id = x.id,
                username = x.username,
                pass = x.pass,
                email = x.email,
                rating = x.rating,
                studysubject = x.studysubject,
                about = x.about,
                latitude = x.latitude,
                longitude = x.longitude,
                ratings = x.ratings,

            });
            return userList.ToList();
        }
        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
            var user = _context.users.FirstOrDefault(x => x.id == id);
            if (user == null) { return NotFound("Invalid user id"); }
            return Ok(user); ;
        }
        [HttpGet("{email}, {password}")]
        public ActionResult<User> Get(string email, string password)
        {
            var user = _context.users.FirstOrDefault(x => x.email == email);
            if (user == null) { return NotFound("Email not registered"); }
            if (password != user.pass) { return NotFound("Wrong password"); }
            return Ok(user);
        }
        [NonAction]
        public string generateID()
        {
            var i = 0;
            foreach (User user in _context.users)
            {
                i++;
            }
            return string.Concat("U", i.ToString("D4"));
        }
        [HttpPost("{username}, {email}, {password}")]
        public async Task<ActionResult> PostAsync(string username, string email, string password)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.users.Any(x => x.email == email))
            {
                return BadRequest("Email has been used");
            }
            var user = new User
            {
                id = generateID(),
                username = username,
                email = email,
                pass = password,
                studysubject = "Empty",
                about = "Empty",
                rating = 0,
                ratings = 0,
                latitude = 0,
                longitude = 0,

            };
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        [NonAction]
        public double calculateRating(double rating, int ratings, double newRating)
        {
            var undoAverage = rating * ratings;
            var newAverage = (undoAverage + newRating) / (ratings + 1);
            return newAverage;

        }
        [HttpPatch("{rating}")]
        public async Task<ActionResult<User>> PatchAsync(string id, double rating)
        {
            var user = _context.users.FirstOrDefault(x => x.id == id);
            if (user != null)
            {
                user.rating = calculateRating(user.rating, user.ratings, rating);
                user.ratings += 1;
            }
            await _context.SaveChangesAsync();
            return Ok(user);
        }
    }
}
