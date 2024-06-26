import event, { EMIT_ACTION } from "../constant/eventEmitter";

export const showLoading = () => {
  event.emit(EMIT_ACTION.SHOW_LOADING, {});
};
export const hideLoading = () => {
    event.emit(EMIT_ACTION.HIDE_LOADING, {});
  };
