import { FC, HTMLAttributes, forwardRef, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import SimpleBar from "simplebar";
import ResizeObserver from 'resize-observer-polyfill';
import 'simplebar/dist/simplebar.css';

type State = Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> & {
  onScroll: (e: Event) => void
}

const CustomBar = forwardRef<SimpleBar, State>((props, ref) => {
  const { className, children, onScroll, ...rest } = props

  const simpleBarEl = useRef<HTMLDivElement>(null)
  const simpleBar = useRef<SimpleBar>()

  useEffect(() => {
    if (!simpleBarEl.current) return

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.ResizeObserver = ResizeObserver;

    simpleBar.current = new SimpleBar(simpleBarEl.current)

    simpleBar.current.getScrollElement()?.addEventListener('scroll', onScroll)

    if (ref) {
      if (typeof ref === 'function') {
        ref(simpleBar.current)
      } else {
        ref.current = simpleBar.current
      }
    }

    return () => {
      SimpleBar.removeObserver()
    }
  }, [])

  return (
    <div ref={simpleBarEl} {...rest} className={twMerge('relative overflow-y-auto overflow-x-hidden', className)}>
      {children}
    </div>
  )
})

export default CustomBar