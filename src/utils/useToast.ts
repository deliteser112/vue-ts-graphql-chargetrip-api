import { reactive, provide, inject } from 'vue'

const ToastSymbol = Symbol()

interface ToastState {
  message: string
  type: string
}

interface Toast {
  state: ToastState
  show: (message: string, type?: string) => void
  close: () => void
}

export function useToastProvider() {
  const state = reactive<ToastState>({
    message: '',
    type: '',
  })

  function show(message: string, type = 'error') {
    state.message = message
    state.type = type
  }

  function close() {
    state.message = ''
  }

  provide(ToastSymbol, {
    state,
    show,
    close,
  })
}

export function useToast(): Toast {
  const toast = inject<Toast>(ToastSymbol)
  if (!toast) {
    throw new Error('No Toast provided!!!')
  }
  return toast
}
