interface IOptions {
    el: string | HTMLElement;
    itemClass: string;
    currentClass: string;
}
declare class PageScroll {
    private readonly wrap;
    private readonly pages;
    private touchInfo;
    private readonly currentClass;
    private currentOffset;
    private prevOffset;
    private index;
    private animateTimer;
    private duration;
    private momentum;
    private tween;
    constructor(options: IOptions);
    private onScrollStart;
    private onScrolling;
    private onScrollEnd;
    scrollTo: (index?: number) => void;
    private setCurrent;
    prev: () => void;
    next: () => void;
}
export default PageScroll;
