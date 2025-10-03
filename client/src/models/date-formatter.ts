export class DateFormatter {
  private date: Date;

  constructor(dateInput: Date | string) {
    if (typeof dateInput === "string") {
      this.date = new Date(dateInput);
    } else {
      this.date = dateInput;
    }
  }

  // Sunday 14:00
  formatWithTime(): string {
    const formattedDate: string = `${this.date.toLocaleDateString("en-US", { weekday: "long" })} ${this.date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        hour12: false,
      },
    )}:00`;
    return formattedDate;
  }

  // Wed, May 29, 2024
  formatWithFullDate(): string {
    const formattedDate: string = this.date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
}
