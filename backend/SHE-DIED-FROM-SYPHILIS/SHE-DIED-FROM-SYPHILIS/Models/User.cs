using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHE_DIED_FROM_SYPHILIS.Models {
  public class User {
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonElement("Name")]
    public string Name { get; set; }
    [BsonElement("Status")]
    public string Status { get; set; }
    [BsonElement("WinsInARow")]
    public int WinsInARow { get; set; }
    [BsonElement("LastUpdate")]
    public DateTime LastUpdate { get; set; }
    [BsonElement("ConnectionId")]
    public string ConnectionId { get; set; }
    }
}
