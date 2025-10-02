export class ToastClass {
  variant: "destructive" | "default" = "default";
  title: string = "Hey!";
  description?: string = undefined;
  duration: number = 2500;
  action?: JSX.Element;

  constructor(
    options?: Partial<
      Omit<ToastClass, "constructor" | keyof typeof ToastClass>
    >,
  ) {
    Object.assign(this, options);
  }

  public static create(v?: "destructive" | "default") {
    if (v !== "destructive" && v !== "default")
      return new ToastClass({ variant: "default" });
    return new ToastClass({ variant: v });
  }

  public setTitle(title: string) {
    this.title = title;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public setDuration(duration: number) {
    this.duration = duration;
    return this;
  }

  public setVariant(variant: "destructive" | "default") {
    this.variant = variant;
    return this;
  }

  public setAction(action: JSX.Element) {
    this.action = action;
    return this;
  }
}
