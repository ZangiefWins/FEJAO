using Microsoft.AspNetCore.SignalR;
using SHE_DIED_FROM_SYPHILIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SHE_DIED_FROM_SYPHILIS.Hubs {
    public class EchoHub : Hub {
        public void EchoUser(User user) {
            Clients.AllExcept(user.ConnectionId).SendAsync("SendUserSelect", user);
        }

        public void EchoChallenge(string connectionId, User user) {
            Clients.Client(connectionId).SendAsync("SendChallenge", user);
        }

        public void EchoChallengeAcceptance(ChallengeAcceptance challengeAcceptance, User user) {
            Clients.Client(challengeAcceptance.User.ConnectionId).SendAsync("SendChallengeAcceptance", challengeAcceptance, user);
        }

        public void EchoFirstToPlay(User first, User second) {
            Clients.Client(first.ConnectionId).SendAsync("SendFirstToPlay", first);
            Clients.Client(second.ConnectionId).SendAsync("SendFirstToPlay", first);
        }

        public void EchoBoard(Board board, User user1, User user2) {
            Clients.Client(user1.ConnectionId).SendAsync("SendBoard", board);
            Clients.Client(user2.ConnectionId).SendAsync("SendBoard", board);
        }

        public string GetConnectionId() {
            return Context.ConnectionId;
        }
    }
}
