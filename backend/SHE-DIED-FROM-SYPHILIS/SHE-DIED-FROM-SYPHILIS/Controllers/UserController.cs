using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SHE_DIED_FROM_SYPHILIS.Models;
using SHE_DIED_FROM_SYPHILIS.Service;

namespace SHE_DIED_FROM_SYPHILIS.Controllers {
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase {
    private readonly UserService _userService;

    public UserController(UserService userService) {
      _userService = userService;
    }

    [HttpGet]
    public ActionResult<List<User>> Get() {
      return _userService.Get();
    }

    [HttpGet("{id}", Name = "GetUser")]
    public ActionResult<User> Get(string id) {
      var user = _userService.Get(id);

      if (user == null) {
        return NotFound();
      }


      return user;
    }

    [HttpPost]
    public ActionResult<User> Create(User user) {
      var exists = _userService.GetByName(user.Name);

      if (exists != null) {
        return BadRequest("User already exists!");
      }

      _userService.Create(user);

      return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, User userIn) {
      var user = _userService.Get(id);

      if (user == null) {
        return NotFound();
      }

      _userService.Update(id, userIn);

      return Ok(userIn);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id) {
      var user = _userService.Get(id);

      if (user == null) {
        return NotFound();
      }

      _userService.Remove(user.Id);

      return Ok(user);
    }
  }
}
