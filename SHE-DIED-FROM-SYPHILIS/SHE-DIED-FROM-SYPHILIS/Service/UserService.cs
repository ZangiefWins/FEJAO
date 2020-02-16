using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using SHE_DIED_FROM_SYPHILIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHE_DIED_FROM_SYPHILIS.Service {
  public class UserService {
    private readonly IMongoCollection<User> _users;

    public UserService(IConfiguration config) {
      var client = new MongoClient(config.GetConnectionString("UserDb"));
      var database = client.GetDatabase("Fejao");
      _users = database.GetCollection<User>("Users");
    }

    public List<User> Get() {
      return _users.Find(user => true).ToList();
    }

    public User Get(string id) {
      return _users.Find<User>(user => user.Id == id).FirstOrDefault();
    }

    public User GetByName(string name) {
      return _users.Find<User>(user => user.Name == name).FirstOrDefault();
    }

    public User Create(User user) {
      _users.InsertOne(user);
      return user;
    }

    public void Update(string id, User userIn) {
      _users.ReplaceOne(user => user.Id == id, userIn);
    }

    public void Remove(string id) {
      _users.DeleteOne(user => user.Id == id);
    }
  }
}
