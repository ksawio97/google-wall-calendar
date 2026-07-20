import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io'; // Import Socket.io
import { getCalendars, initEventsListener } from './syncData';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.get("/api/calendars", async (req, res) => {
    try {
        return res.json(await getCalendars());
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch calendars' });
    }
});


async function startServer() {
    try {
        console.log("Fetching initial calendar data...");
        const eventsListener = await initEventsListener();
        console.log("Calendar data loaded!");

        setInterval(async () => {
            try {
                const { added, deleted, changed } = await eventsListener.checkChanges();
                
                for (const [data, emitId] of [[added, "events_added"], [deleted, "events_deleted"], [changed, "events_changed"]] as [any[], string][]) {
                    if (data.length > 0) {
                        console.log(`Emit: ${emitId}`);
                        io.emit(emitId, data); 
                    }
                }  
            } catch (error) {
                console.error("Error fetching calendar updates:", error);
            }
        }, 5 * 60 * 1000);

        // Setup the WebSocket connections
        io.on('connection', (socket) => {
            console.log('Frontend connected to WebSockets! ID:', socket.id);
            socket.emit("events_added", eventsListener.getEvents());
            
            socket.on('disconnect', () => {
                console.log('Frontend disconnected:', socket.id);
            });
        });
        
        // start server
        server.listen(3001, () => {
            console.log('Server running on http://localhost:3001');
        });

    } catch (error) {
        console.error("CRITICAL ERROR: Failed to start server.", error);
        process.exit(1);
    }
}

startServer();
