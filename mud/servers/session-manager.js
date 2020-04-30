let sessions = []

class SessionManager
{
    static addSession(session) {
        sessions.push(session)
    }
}

module.exports = SessionManager