export class MockSocket {
  constructor(onMessage) {
    this.onMessage = onMessage;
    this.timer = null;
  }

  connect() {
      let counter = 0;

    this.timer = setInterval(() => {
      this.onMessage({
        id: crypto.randomUUID(),
        text: "Live msg " + Date.now(),
        time: new Date().toLocaleTimeString(),
        counter : counter
      });
      counter++;
    }, 150);
  }

  disconnect() {
    clearInterval(this.timer);
  }
}