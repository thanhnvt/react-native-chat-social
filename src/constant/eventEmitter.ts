import { EventSubscription } from "react-native";
import _EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

export enum EMIT_ACTION {
  SHOW_LOADING = "SHOW_LOADING",
  HIDE_LOADING = "HIDE_LOADING",
}

class Emitter {
  event = new _EventEmitter();

  addListener = <T extends keyof typeof EMIT_ACTION>(
    key: T,
    callback: (res: any) => void
  ): EventSubscription => this.event.addListener(key, callback);

  removeListener = () => {
    this.event.removeAllListeners();
  };

  emit = <T extends keyof typeof EMIT_ACTION>(
    key: T,
    data: any
  ) => {
    this.event.emit(key, data);
  };
}
const event = new Emitter();
export default event;
