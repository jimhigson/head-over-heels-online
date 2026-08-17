import { type AppTicker, type AppTickerCallback } from "./AppTicker";

/**
 * one subscription in {@link AppTicker}'s list, which is a doubly-linked list
 * kept in descending priority order. A linked list rather than an array because
 * listeners are added and removed *during* emit - a sprite finishing its
 * animation removes itself mid-iteration - and each node hands the emit loop
 * the node to visit next, which stays correct however the list is rearranged.
 */
export class AppTickerListener {
  next: AppTickerListener | undefined = undefined;
  previous: AppTickerListener | undefined = undefined;

  readonly priority: number;

  /**
   * the callback with its context already bound in. Held separately from the
   * two below because those are kept only to identify the listener again on
   * removal, where the context's type is long forgotten
   */
  #invoke: ((ticker: AppTicker) => void) | undefined;
  #fn: unknown;
  #context: unknown;
  #once: boolean;
  #destroyed = false;

  constructor(
    invoke: ((ticker: AppTicker) => void) | undefined,
    fn: unknown,
    context: unknown,
    priority: number,
    once = false,
  ) {
    this.#invoke = invoke;
    this.#fn = fn;
    this.#context = context;
    this.priority = priority;
    this.#once = once;
  }

  /**
   * the generic lives here rather than on the class: a callback and its context
   * are only known to belong together at the point of subscribing, while the
   * list holds listeners of every context type at once
   */
  static of<Context>(
    fn: AppTickerCallback<Context> | undefined,
    context: Context | undefined,
    priority: number,
    once = false,
  ): AppTickerListener {
    return new AppTickerListener(
      fn === undefined ? undefined : (ticker) => fn.call(context, ticker),
      fn,
      context,
      priority,
      once,
    );
  }

  match(fn: unknown, context: unknown): boolean {
    return this.#fn === fn && this.#context === context;
  }

  /** call the listener, and give back the node to emit next */
  emit(ticker: AppTicker): AppTickerListener | undefined {
    this.#invoke?.(ticker);

    const redirect = this.next;

    if (this.#once) {
      this.destroy(true);
    }

    if (this.#destroyed) {
      this.next = undefined;
    }

    return redirect;
  }

  /** splice this node in after `previous` */
  connect(previous: AppTickerListener): void {
    this.previous = previous;
    if (previous.next !== undefined) {
      previous.next.previous = this;
    }
    this.next = previous.next;
    previous.next = this;
  }

  /**
   * unlink this node, giving back the node the emit loop should visit next -
   * `undefined` for a hard destroy, which stops that loop rather than letting
   * it walk on from a node that is no longer in the list
   */
  destroy(hard = false): AppTickerListener | undefined {
    this.#destroyed = true;
    this.#invoke = undefined;
    this.#fn = undefined;
    this.#context = undefined;

    if (this.previous !== undefined) {
      this.previous.next = this.next;
    }
    if (this.next !== undefined) {
      this.next.previous = this.previous;
    }

    const redirect = this.next;
    this.next = hard ? undefined : redirect;
    this.previous = undefined;

    return redirect;
  }
}
