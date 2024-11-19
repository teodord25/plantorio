package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/websocket"
)

// init upgrader with default options 
var upgrader = websocket.Upgrader{
    // TODO: check origin
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println("Upgrade error:", err)
        return
    }
    defer conn.Close()

    log.Println("Client connected")

    for {
        // read message from client
        messageType, message, err := conn.ReadMessage() // .ReadMessage() is a blocking call
        if err != nil {
            log.Println("Read error:", err)
            break
        }

        log.Printf("Received: %s", message)

        // echo the message back to client
        err = conn.WriteMessage(messageType, message)
        if err != nil {
            log.Println("Write error:", err)
            break
        }
    }

    log.Println("Client disconnected")
}

func main() {
    fs := http.FileServer(http.Dir("./client"))
    http.Handle("/", fs)

    http.HandleFunc("/ws", handleWebSocket)

    fmt.Println("Server started on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
