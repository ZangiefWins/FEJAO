using Microsoft.AspNetCore.SignalR;
using SHE_DIED_FROM_SYPHILIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHE_DIED_FROM_SYPHILIS.Hubs {
    public class EchoHub : Hub {
        public void Echo(User user) {
            Clients.AllExcept(user.ConnectionId).SendAsync("Send", user);
        }

        public void EchoChallenge(string connectionId, User user) {
            Clients.Client(connectionId).SendAsync("SendChallenge", user);
        }

        public string GetConnectionId() {
            return Context.ConnectionId;
        }
    }
}
