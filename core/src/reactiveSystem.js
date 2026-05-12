import { EventEmitter } from 'events';

export class ReactiveEntity extends EventEmitter {
    emit(event, ...args) {
        const listeners = this.listeners(event);
        
        if (event === 'error' && listeners.length === 0) {
            throw args[0] || new Error('Unhandled reactive error');
        }

        let hasListeners = false;
        for (const listener of listeners) {
            hasListeners = true;
            try {
                listener.apply(this, args);
            } catch (err) {
                this.emit('error', err);
            }
        }
        return hasListeners;
    }

    subscribe(event, listener) {
        this.on(event, listener);
    }

    unsubscribe(event, listener) {
        this.off(event, listener);
    }
}