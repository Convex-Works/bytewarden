import { StateUpdateOptions as RequiredStateUpdateOptions } from "@bytewarden/state";

export * from "@bytewarden/state";
export { ActiveUserAccessor } from "@bytewarden/state-internal";

export type StateUpdateOptions<T, TCombine> = Partial<RequiredStateUpdateOptions<T, TCombine>>;
