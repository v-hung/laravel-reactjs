import { useRef, useEffect, HTMLAttributes } from "react";
import katex from 'katex';
import 'katex/dist/katex.min.css';

type State = { math: string } & HTMLAttributes<HTMLSpanElement>

const InlineMath = (props: State) => {
  const { math, ...rest } = props

  const el = useRef(null)

  useEffect(() => {
    if (!el.current || !math) return

    katex.render(math, el.current, {
      throwOnError: false,
    })
  }, [math])

  return (
    <span ref={el} {...rest}></span>
  )
}

export default InlineMath