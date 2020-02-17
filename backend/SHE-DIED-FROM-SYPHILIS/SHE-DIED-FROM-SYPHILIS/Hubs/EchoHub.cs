using Microsoft.AspNetCore.SignalR;
using SHE_DIED_FROM_SYPHILIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHE_DIED_FROM_SYPHILIS.Hubs {
    public class EchoHub : Hub {
        public void Echo(User user) {
            Clients.All.SendAsync("Send", user);
        }
    }
}
