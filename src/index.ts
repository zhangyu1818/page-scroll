import Tween, { TweenFunc } from "./tween";

const clamp = (current: number, min: number, max: number) =>
  Math.min(Math.max(min, current), max);

interface IOptions {
  el: string | HTMLElement;
  itemClass: string;
  currentClass: string;
}

class PageScroll {
  private readonly wrap: HTMLElement;
  private readonly pages: Array<HTMLElement>;
  private touchInfo = {
    start: { pos: 0, timeStamp: 0, isScroll: false },
    move: { pos: 0, timeStamp: 0, isScroll: false }
  };
  private readonly currentClass: string = "";
  private currentOffset: number = 0;
  private prevOffset: number = 0;
  private index: number = 0;
  private animateTimer: number = 0;
  private duration: number = 0.6;
  private momentum: number = 1;
  private tween: TweenFunc = "Quad.easeOut";
  constructor(options: IOptions) {
    const { el, itemClass, currentClass } = options;
    if (typeof el === "object") this.wrap = el;
    else {
      const temp = document.querySelector<HTMLElement>(el);
      if (temp) this.wrap = temp;
      else throw new Error("el not found");
    }
    this.currentClass = currentClass;
    this.pages = Array.from(
      this.wrap.querySelectorAll<HTMLElement>(`.${itemClass}`)
    );
    this.pages.forEach((item, index) => {
      if (index === 0) item.classList.add(currentClass);
      item.style.height = `${window.innerHeight}px`;
    });
    this.wrap.addEventListener("touchstart", this.onScrollStart);
    this.wrap.addEventListener("touchmove", this.onScrolling);
    this.wrap.addEventListener("touchend", this.onScrollEnd);
  }
  private onScrollStart = (event: TouchEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
    const { timeStamp, touches } = event;
    const { pageY } = touches[0];
    this.touchInfo.start = { pos: pageY, timeStamp, isScroll: true };
    this.touchInfo.move.isScroll = false;
  };
  private onScrolling = (event: TouchEvent) => {
    if (!this.touchInfo.start.isScroll) return;
    event.stopPropagation();
    event.preventDefault();
    const { timeStamp, touches } = event;
    const { pageY } = touches[0];
    this.touchInfo.move = { pos: pageY, timeStamp, isScroll: true };
    const tempOffset = this.touchInfo.move.pos - this.touchInfo.start.pos;
    this.currentOffset = tempOffset + this.prevOffset;
    this.wrap.style.transform = `translate3d(0,${this.currentOffset}px,0)`;
  };
  private onScrollEnd = (event: TouchEvent) => {
    if (!this.touchInfo.start.isScroll) return;
    event.stopPropagation();
    event.preventDefault();
    this.touchInfo.start.isScroll = false;
    this.prevOffset = this.currentOffset;
    if (!this.touchInfo.move.isScroll)
      this.touchInfo.move.pos = this.touchInfo.start.pos;
    const speed =
      (this.touchInfo.move.pos - this.touchInfo.start.pos) /
      (this.touchInfo.move.timeStamp - this.touchInfo.start.timeStamp);
    this.index = clamp(
      Math.abs(speed) > this.momentum
        ? speed > 0
          ? --this.index
          : ++this.index
        : -Math.round(
            (this.prevOffset = this.currentOffset) / window.innerHeight
          ),
      0,
      this.pages.length - 1
    );
    this.scrollTo();
  };
  public scrollTo = (index = this.index) => {
    if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
    const startTime = Date.now();
    const duration = this.duration;
    const startPos = this.currentOffset;
    const endPos = index * -window.innerHeight - this.prevOffset;
    const callback = () => {
      const currentTime = Date.now();
      const delta = (currentTime - startTime) / 1000;
      const offset = Tween(this.tween)(delta, startPos, endPos, duration);
      this.wrap.style.transform = `translate3d(0,${offset}px,0)`;
      this.prevOffset = this.currentOffset = offset;
      if (delta >= duration) {
        cancelAnimationFrame(this.animateTimer);
        const completedOffset = index * -window.innerHeight;
        this.prevOffset = this.currentOffset = completedOffset;
        this.wrap.style.transform = `translate3d(0,${completedOffset}px,0)`;
        this.index = clamp(
          -Math.round(completedOffset / window.innerHeight),
          0,
          this.pages.length - 1
        );
        this.setCurrent(this.index);
        return;
      }
      this.animateTimer = requestAnimationFrame(callback);
    };
    callback();
  };
  private setCurrent = (currentIndex: number) => {
    this.pages.forEach((item, index) => {
      if (index === currentIndex) item.classList.add(this.currentClass);
      else item.classList.remove(this.currentClass);
    });
  };
  public prev = () => {
    const index = clamp(--this.index, 0, this.pages.length - 1);
    this.scrollTo(index);
  };
  public next = () => {
    const index = clamp(++this.index, 0, this.pages.length - 1);
    this.scrollTo(index);
  };
}

export default PageScroll;
